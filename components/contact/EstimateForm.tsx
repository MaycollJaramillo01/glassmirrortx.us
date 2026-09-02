"use client";

import { FormEvent, useId, useState } from "react";
import { CheckCircle2, ImagePlus, X } from "lucide-react";

import { business, cta } from "@/data/business";
import { serviceOptions } from "@/data/services";
import { Button } from "@/components/ui/Button";

type FormState = "idle" | "loading" | "success" | "error";

const MAX_PHOTOS = 3;
const MAX_PHOTO_BYTES = 1.2 * 1024 * 1024;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"];

const inputClassName =
  "mt-2 w-full border border-charcoal/20 bg-white px-4 py-3.5 text-[0.96rem] text-charcoal outline-none transition-colors placeholder:text-muted/80 focus:border-forest focus:ring-2 focus:ring-gold/50";

export function EstimateForm() {
  const photoInputId = useId();
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");
  const [photos, setPhotos] = useState<File[]>([]);

  function addPhotos(files: FileList | null) {
    if (!files?.length) return;

    const next: File[] = [...photos];
    let rejectReason = "";

    for (const file of Array.from(files)) {
      if (next.length >= MAX_PHOTOS) {
        rejectReason = `You can attach up to ${MAX_PHOTOS} photos.`;
        break;
      }
      if (!ACCEPTED_TYPES.includes(file.type) && !/\.(jpe?g|png|webp|heic|heif)$/i.test(file.name)) {
        rejectReason = "Photos must be JPG, PNG, WEBP, or HEIC.";
        continue;
      }
      if (file.size > MAX_PHOTO_BYTES) {
        rejectReason = "Each photo must be under 1.2 MB. Compress larger images or send fewer photos.";
        continue;
      }
      next.push(file);
    }

    setPhotos(next);
    if (rejectReason) {
      setState("error");
      setMessage(rejectReason);
    } else if (state === "error") {
      setState("idle");
      setMessage("");
    }
  }

  function removePhoto(index: number) {
    setPhotos((current) => current.filter((_, i) => i !== index));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("loading");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.delete("photos");
    for (const photo of photos) {
      formData.append("photos", photo);
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });
      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        setState("error");
        setMessage(result.message ?? "We could not send the request. Please call us instead.");
        return;
      }

      form.reset();
      setPhotos([]);
      setState("success");
      setMessage(result.message ?? "Your request is in. We will be in touch shortly.");
    } catch {
      setState("error");
      setMessage(`Connection failed. Please call ${business.phone} instead.`);
    }
  }

  if (state === "success") {
    return (
      <div className="border border-forest/20 bg-white p-7 sm:p-10" role="status">
        <CheckCircle2 className="size-8 text-forest" aria-hidden="true" strokeWidth={1.8} />
        <h2 className="mt-6 font-display text-3xl font-extrabold tracking-tight text-charcoal">Request received.</h2>
        <p className="mt-4 max-w-[38rem] text-[0.98rem] leading-relaxed text-muted">{message}</p>
        <button
          type="button"
          onClick={() => setState("idle")}
          className="mt-7 font-display text-[0.72rem] font-bold tracking-[0.12em] text-forest uppercase underline decoration-gold underline-offset-4 hover:text-gold-deep"
        >
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form
      id="appointment-form"
      onSubmit={handleSubmit}
      className="border border-charcoal/10 bg-white p-6 shadow-[0_16px_60px_rgba(23,28,25,0.08)] sm:p-9"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-[0.82rem] font-semibold text-charcoal">
          Name
          <input className={inputClassName} name="name" required autoComplete="name" placeholder="Your name" />
        </label>
        <label className="text-[0.82rem] font-semibold text-charcoal">
          Phone
          <input
            className={inputClassName}
            name="phone"
            required
            autoComplete="tel"
            inputMode="tel"
            placeholder="Your phone number"
          />
        </label>
        <label className="text-[0.82rem] font-semibold text-charcoal">
          Email <span className="font-normal text-muted">(optional)</span>
          <input className={inputClassName} name="email" type="email" autoComplete="email" placeholder="you@example.com" />
        </label>
        <label className="text-[0.82rem] font-semibold text-charcoal">
          Property city
          <input className={inputClassName} name="city" required autoComplete="address-level2" placeholder="Houston" />
        </label>
      </div>

      <label className="mt-5 block text-[0.82rem] font-semibold text-charcoal">
        What do you need help with?
        <select className={inputClassName} name="service" required defaultValue="">
          <option value="" disabled>
            Select a service
          </option>
          {serviceOptions.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </label>

      <label className="mt-5 block text-[0.82rem] font-semibold text-charcoal">
        Message
        <textarea
          className={`${inputClassName} min-h-36 resize-y`}
          name="details"
          required
          minLength={12}
          placeholder="Describe the glass or mirror work, the room, and anything we should know about the opening."
        />
      </label>

      <div className="mt-5">
        <p className="text-[0.82rem] font-semibold text-charcoal">
          Photos <span className="font-normal text-muted">(optional, up to {MAX_PHOTOS})</span>
        </p>
        <p className="mt-1 text-[0.78rem] leading-relaxed text-muted">
          Attach pictures of the opening, broken glass, or the space you want measured. Keep each photo under
          1.2 MB.
        </p>

        <input
          id={photoInputId}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/heic,image/heif,.jpg,.jpeg,.png,.webp,.heic,.heif"
          multiple
          className="sr-only"
          onChange={(event) => {
            addPhotos(event.target.files);
            event.target.value = "";
          }}
        />

        <label
          htmlFor={photoInputId}
          className="mt-3 inline-flex min-h-[44px] cursor-pointer items-center gap-2 border border-dashed border-charcoal/25 bg-sand/40 px-4 py-3 text-[0.84rem] font-semibold text-charcoal transition-colors hover:border-forest hover:bg-sand"
        >
          <ImagePlus className="size-4 text-forest" aria-hidden="true" strokeWidth={2.2} />
          Add photos
        </label>

        {photos.length > 0 && (
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {photos.map((photo, index) => (
              <li
                key={`${photo.name}-${photo.size}-${index}`}
                className="flex items-center justify-between gap-3 border border-charcoal/10 bg-white px-3 py-2.5 text-[0.8rem] text-charcoal"
              >
                <span className="min-w-0 truncate">{photo.name}</span>
                <button
                  type="button"
                  onClick={() => removePhoto(index)}
                  className="inline-flex size-8 shrink-0 items-center justify-center text-muted transition-colors hover:text-charcoal"
                  aria-label={`Remove ${photo.name}`}
                >
                  <X className="size-4" aria-hidden="true" strokeWidth={2.2} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <label className="sr-only" aria-hidden="true">
        Company
        <input name="company" tabIndex={-1} autoComplete="off" />
      </label>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-[24rem] text-[0.78rem] leading-relaxed text-muted">
          Send a message here, or call {business.phone}. Prefer WhatsApp? Use the green chat button.
        </p>
        <Button type="submit" variant="secondary" withArrow disabled={state === "loading"}>
          {state === "loading" ? "Sending request" : cta.estimateSubmit}
        </Button>
      </div>

      {state === "error" && (
        <p
          className="mt-5 border-l-2 border-gold bg-gold/10 px-4 py-3 text-[0.88rem] leading-relaxed text-charcoal"
          role="alert"
        >
          {message}
        </p>
      )}
    </form>
  );
}
