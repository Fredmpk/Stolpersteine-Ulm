import Head from "next/head";

export default function Kontakt() {
  return (
    <>
      <Head>
        <script src="https://js.hcaptcha.com/1/api.js" async defer></script>
      </Head>
      <h1 className="text-2xl md:text-4xl text-[var(--color-heading)] my-6">
        Kontakt
      </h1>
      <form
        action="https://submit-form.com/Z6rMHx4DN"
        method="POST"
        className="max-w-md lg:max-w-lg space-y-4"
      >
        {/* Honeypot (bots will fill this, humans won't) */}
        <input
          type="text"
          name="company"
          autoComplete="off"
          className="hidden"
        />

        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-sm">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
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
            className="mt-2 rounded border border-current px-4 md:px-8 lg:px-12 py-2 text-sm hover:opacity-80 bg-[var(--color-heading)] text-white font-bold on-hover:bg-zinc-400 transition-colors on"
          >
            Senden
          </button>
        </div>
      </form>
    </>
  );
}
