"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { AppleIcon, CloseIcon } from "@/components/icons";

export default function AuthModal() {
  const { promptOpen, closePrompt, login } = useAuth();
  const [email, setEmail] = useState("");
  const [appleNote, setAppleNote] = useState(false);

  if (!promptOpen) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    login(email.trim());
    setEmail("");
    setAppleNote(false);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Sign up or log in"
      onClick={closePrompt}
    >
      <div className="w-full max-w-sm bg-white p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between">
          <h2 className="text-lg font-medium text-neutral-900">Sign up or log in</h2>
          <button
            type="button"
            onClick={closePrompt}
            aria-label="Close"
            className="text-neutral-500 transition hover:text-neutral-900"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>
        <p className="mt-1 text-sm text-muted">Save favorites and check out faster.</p>

        <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3">
          <label className="flex flex-col gap-1.5 text-sm text-neutral-700">
            Email
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="rounded-md border border-border px-3 py-2.5 text-sm text-neutral-900 focus:border-accent focus:outline-none"
            />
          </label>
          <button
            type="submit"
            className="rounded-md bg-accent py-2.5 text-sm font-medium text-accent-foreground transition hover:brightness-95"
          >
            Continue
          </button>
        </form>

        <div className="my-4 flex items-center gap-3 text-xs text-muted">
          <span className="h-px flex-1 bg-border" />
          or
          <span className="h-px flex-1 bg-border" />
        </div>

        <button
          type="button"
          onClick={() => setAppleNote(true)}
          className="flex w-full items-center justify-center gap-2 rounded-md bg-neutral-900 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-700"
        >
          <AppleIcon className="h-4 w-4" />
          Sign in with Apple
        </button>
        {appleNote && (
          <p className="mt-2 text-xs leading-relaxed text-muted">
            Apple Sign-In needs a real Apple Developer account and backend to verify tokens — not available in this
            preview build. Continue with email above instead.
          </p>
        )}

        <p className="mt-4 text-xs leading-relaxed text-muted">
          This is a placeholder sign-in for preview purposes — no password or verification required.
        </p>
      </div>
    </div>
  );
}
