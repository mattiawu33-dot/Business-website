"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return <p className="text-sm text-neutral-700">Thanks — you&apos;re on the list.</p>;
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className="flex border border-neutral-300 bg-white"
    >
      <input
        type="email"
        required
        placeholder="Email address"
        className="w-full px-3 py-2 text-sm outline-none placeholder:text-neutral-400"
      />
      <button type="submit" className="shrink-0 px-3 text-sm text-neutral-700 hover:text-neutral-900">
        Join
      </button>
    </form>
  );
}
