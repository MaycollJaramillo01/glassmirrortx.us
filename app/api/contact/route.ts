import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

import { business } from "@/data/business";

export const runtime = "nodejs";

const MAX_PHOTOS = 3;
const MAX_PHOTO_BYTES = 1.2 * 1024 * 1024;
const ACCEPTED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"]);

const estimateSchema = z.object({
  name: z.string().trim().min(2).max(80),
  phone: z.string().trim().min(7).max(30),
  email: z.string().trim().email().max(160).optional().or(z.literal("")),
  city: z.string().trim().min(2).max(80),
  service: z.string().trim().min(2).max(100),
  details: z.string().trim().min(12).max(2000),
  company: z.string().max(0).optional(),
});

type Attachment = {
  filename: string;
  content: Buffer;
  contentType?: string;
};

function field(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

async function readPhotos(formData: FormData): Promise<{ photos: Attachment[]; error?: string }> {
  const files = formData
    .getAll("photos")
    .filter((entry): entry is File => typeof File !== "undefined" && entry instanceof File && entry.size > 0);

  if (files.length > MAX_PHOTOS) {
    return { photos: [], error: `Please attach no more than ${MAX_PHOTOS} photos.` };
  }

  const photos: Attachment[] = [];

  for (const [index, file] of files.entries()) {
    if (!ACCEPTED_TYPES.has(file.type) && !/\.(jpe?g|png|webp|heic|heif)$/i.test(file.name)) {
      return { photos: [], error: "Photos must be JPG, PNG, WEBP, or HEIC." };
    }
    if (file.size > MAX_PHOTO_BYTES) {
      return { photos: [], error: "Each photo must be under 1.2 MB." };
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const extension = file.name.includes(".") ? file.name.split(".").pop() : "jpg";
    photos.push({
      filename: file.name || `photo-${index + 1}.${extension}`,
      content: buffer,
      contentType: file.type || undefined,
    });
  }

  return { photos };
}

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";

  let payload: Record<string, string>;
  let photos: Attachment[] = [];

  try {
    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      payload = {
        name: field(formData, "name"),
        phone: field(formData, "phone"),
        email: field(formData, "email"),
        city: field(formData, "city"),
        service: field(formData, "service"),
        details: field(formData, "details"),
        company: field(formData, "company"),
      };
      const photoResult = await readPhotos(formData);
      if (photoResult.error) {
        return NextResponse.json({ message: photoResult.error }, { status: 400 });
      }
      photos = photoResult.photos;
    } else {
      payload = (await request.json()) as Record<string, string>;
    }
  } catch {
    return NextResponse.json({ message: "Please check the form and try again." }, { status: 400 });
  }

  const result = estimateSchema.safeParse(payload);
  if (!result.success) {
    return NextResponse.json({ message: "Please complete the required fields before sending." }, { status: 400 });
  }

  if (result.data.company) {
    return NextResponse.json({ message: "Your request is in. We will be in touch shortly." });
  }

  const { name, phone, email, city, service, details } = result.data;
  const subject = `Appointment request: ${service} in ${city}`;
  const text = [
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Email: ${email || "Not provided"}`,
    `City: ${city}`,
    `Service: ${service}`,
    `Photos attached: ${photos.length}`,
    "",
    details,
  ].join("\n");

  if (!process.env.RESEND_API_KEY) {
    console.info("Estimate request received", {
      name,
      phone,
      email,
      city,
      service,
      details,
      photoCount: photos.length,
    });
    return NextResponse.json({ message: "Your request is in. We will be in touch shortly." });
  }

  const from = process.env.ESTIMATE_FROM_EMAIL;
  const recipients = process.env.ESTIMATE_TO_EMAIL?.split(",")
    .map((value) => value.trim())
    .filter(Boolean);

  if (!from || !recipients?.length) {
    return NextResponse.json(
      { message: `The appointment form is not configured yet. Please call us at ${business.phone}.` },
      { status: 503 },
    );
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from,
    to: recipients,
    replyTo: email || business.email,
    subject,
    text,
    attachments: photos.map(({ filename, content }) => ({
      filename,
      content,
    })),
  });

  if (error) {
    console.error("Estimate email failed", error);
    return NextResponse.json(
      { message: `We could not send the request. Please call us at ${business.phone}.` },
      { status: 502 },
    );
  }

  return NextResponse.json({ message: "Your request is in. We will be in touch shortly." });
}
