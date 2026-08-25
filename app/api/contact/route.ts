import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

import { business } from "@/data/business";

const estimateSchema = z.object({
  name: z.string().trim().min(2).max(80),
  phone: z.string().trim().min(7).max(30),
  email: z.string().trim().email().max(160).optional().or(z.literal("")),
  city: z.string().trim().min(2).max(80),
  service: z.string().trim().min(2).max(100),
  details: z.string().trim().min(12).max(2000),
  company: z.string().max(0).optional(),
});

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
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
    "",
    details,
  ].join("\n");

  if (!process.env.RESEND_API_KEY) {
    console.info("Estimate request received", { name, phone, email, city, service, details });
    return NextResponse.json({ message: "Your request is in. We will be in touch shortly." });
  }

  const from = process.env.ESTIMATE_FROM_EMAIL;
  const recipients = process.env.ESTIMATE_TO_EMAIL?.split(",").map((value) => value.trim()).filter(Boolean);

  if (!from || !recipients?.length) {
    return NextResponse.json({ message: `The appointment form is not configured yet. Please call us at ${business.phone}.` }, { status: 503 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from,
    to: recipients,
    replyTo: email || business.email,
    subject,
    text,
  });

  if (error) {
    console.error("Estimate email failed", error);
    return NextResponse.json({ message: `We could not send the request. Please call us at ${business.phone}.` }, { status: 502 });
  }

  return NextResponse.json({ message: "Your request is in. We will be in touch shortly." });
}
