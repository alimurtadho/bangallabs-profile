"use client";

import { Send } from "lucide-react";
import { useState } from "react";

type ContactFormProps = {
  whatsapp: string;
};

export function ContactForm({ whatsapp }: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (!name || !email || !message || !email.includes("@")) {
      setStatus("error");
      return;
    }

    const company = String(data.get("company") ?? "").trim();
    const projectNeed = String(data.get("projectNeed") ?? "").trim();
    const whatsappMessage = [
      "Halo BangAl Labs, saya ingin konsultasi.",
      `Nama: ${name}`,
      `Email: ${email}`,
      company ? `Perusahaan: ${company}` : "",
      projectNeed ? `Kebutuhan: ${projectNeed}` : "",
      `Pesan: ${message}`
    ]
      .filter(Boolean)
      .join("\n");

    window.gtag?.("event", "generate_lead", {
      form_name: "contact_whatsapp",
      project_need: projectNeed || "not_specified"
    });
    window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(whatsappMessage)}`, "_blank", "noopener,noreferrer");
    setStatus("success");
    event.currentTarget.reset();
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-3" noValidate>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-white/[0.82]">
          Name
          <input name="name" required className="rounded border border-white/[0.14] bg-white/[0.08] px-3 py-3 text-white outline-none focus:border-teal" />
        </label>
        <label className="grid gap-2 text-sm font-medium text-white/[0.82]">
          Email
          <input
            name="email"
            type="email"
            required
            className="rounded border border-white/[0.14] bg-white/[0.08] px-3 py-3 text-white outline-none focus:border-teal"
          />
        </label>
      </div>
      <label className="grid gap-2 text-sm font-medium text-white/[0.82]">
        Company
        <input name="company" className="rounded border border-white/[0.14] bg-white/[0.08] px-3 py-3 text-white outline-none focus:border-teal" />
      </label>
      <label className="grid gap-2 text-sm font-medium text-white/[0.82]">
        Project Need
        <input
          name="projectNeed"
          placeholder="AI, analytics, digital transformation, or cloud deployment"
          className="rounded border border-white/[0.14] bg-white/[0.08] px-3 py-3 text-white outline-none placeholder:text-white/[0.34] focus:border-teal"
        />
      </label>
      <label className="grid gap-2 text-sm font-medium text-white/[0.82]">
        Message
        <textarea
          name="message"
          required
          rows={4}
          className="resize-none rounded border border-white/[0.14] bg-white/[0.08] px-3 py-3 text-white outline-none focus:border-teal"
        />
      </label>
      <button type="submit" data-analytics="contact_form_submit" className="inline-flex items-center justify-center gap-2 rounded bg-teal px-5 py-3 font-semibold text-ink transition hover:bg-white">
        <Send size={18} />
        Send Inquiry
      </button>
      {status === "success" ? <p className="text-sm text-teal">WhatsApp dibuka dengan detail kebutuhan Anda. Silakan kirim pesannya untuk melanjutkan.</p> : null}
      {status === "error" ? <p className="text-sm text-amber">Please fill name, valid email, and message.</p> : null}
    </form>
  );
}
