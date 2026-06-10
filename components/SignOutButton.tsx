"use client";

import { signOut } from "next-auth/react";

export function SignOutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/" })}
      className="rounded-full px-3 py-1.5 text-sm font-medium text-nyuzi-muted ring-1 ring-stone-200 transition hover:bg-nyuzi-sand hover:text-nyuzi-ink"
    >
      Sign out
    </button>
  );
}
