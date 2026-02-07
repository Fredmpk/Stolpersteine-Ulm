"use client";
import Head from "next/head";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { useFormspark } from "@formspark/use-formspark";

const FORMSPARK_FORM_ID = "Z6rMHx4DN"; // Your form ID

interface FormData {
  name: string;
  email: string;
  message: string;
  company: string; // honeypot
  "h-captcha-response"?: string; // hCaptcha token
  [key: string]: string | undefined;
}

export default function Kontakt() {
  const [submit, submitting] = useFormspark({
    formId: FORMSPARK_FORM_ID,
  });

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
    company: "", // honeypot
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Get hCaptcha token
    const hcaptchaResponse = (window as any).hcaptcha?.getResponse();

    if (!hcaptchaResponse) {
      alert("Bitte lösen Sie das Captcha");
      return;
    }

    // Include hCaptcha token in submission
    const submitData = {
      ...formData,
      "h-captcha-response": hcaptchaResponse,
    };

    await submit(submitData);
    alert("Formular gesendet!");

    // Reset form and hCaptcha
    setFormData({
      name: "",
      email: "",
      message: "",
      company: "",
    });
    (window as any).hcaptcha?.reset();
  };

  return (
    <>
      <Head>
        <script src="https://js.hcaptcha.com/1/api.js" async defer></script>
      </Head>
      <h1 className="text-2xl md:text-4xl text-[var(--color-heading)] my-6">
        Kontakt
      </h1>
      <form onSubmit={onSubmit} className="max-w-md lg:max-w-lg space-y-4">
        {/* Honeypot */}
        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          autoComplete="off"
          className="hidden"
          tabIndex={-1}
        />

        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-sm">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
            className="rounded border border-current bg-transparent px-3 py-2 text-sm focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="rounded border border-current bg-transparent px-3 py-2 text-sm focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="message" className="text-sm">
            Nachricht
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            value={formData.message}
            onChange={handleChange}
            required
            className="rounded border border-current bg-transparent px-3 py-2 text-sm focus:outline-none"
          />
        </div>

        {/* hCaptcha */}
        <div
          className="h-captcha"
          data-sitekey="234ab8b0-f654-4dc6-9770-e3a2bc46e482"
        ></div>

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={submitting}
            className="mt-2 rounded border border-current px-4 md:px-8 lg:px-12 py-2 text-sm hover:opacity-80 bg-[var(--color-heading)] text-white font-bold transition-colors disabled:opacity-50"
          >
            {submitting ? "Wird gesendet..." : "Senden"}
          </button>
        </div>
      </form>
    </>
  );
}
