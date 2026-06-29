"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { SignOutButton } from "@/components/SignOutButton";
import type { SessionUser } from "@/lib/auth-types";

interface MobileNavProps {
  session: SessionUser | null;
}

const linkClass =
  "block rounded-xl px-4 py-3 text-base font-medium text-nyuzi-ink transition hover:bg-nyuzi-sand";

export function MobileNav({ session }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex h-10 w-10 items-center justify-center rounded-xl ring-1 ring-stone-200/80 transition hover:bg-white/80"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
      >
        <svg className="h-5 w-5 text-nyuzi-ink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {open ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 top-[65px] z-40 bg-nyuzi-ink/20 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <nav className="fixed left-4 right-4 top-[73px] z-50 overflow-hidden rounded-2xl bg-white p-3 shadow-2xl ring-1 ring-stone-200/80">
            <Link href="/#shop" className={linkClass} onClick={() => setOpen(false)}>
              Shop
            </Link>
            {session?.role === "buyer" && (
              <Link href="/account/orders" className={linkClass} onClick={() => setOpen(false)}>
                My orders
              </Link>
            )}
            {session?.role === "artisan" && (
              <Link
                href="/artisan/dashboard"
                className={linkClass}
                onClick={() => setOpen(false)}
              >
                Dashboard
              </Link>
            )}
            <div className="mt-2 border-t border-nyuzi-sand pt-2">
              {session ? (
                <div className="space-y-2 px-4 py-2">
                  <p className="text-sm text-nyuzi-muted">Signed in as {session.fullName}</p>
                  <SignOutButton />
                </div>
              ) : (
                <Link
                  href="/login"
                  className="block rounded-xl bg-nyuzi-amber px-4 py-3 text-center text-base font-semibold text-white"
                  onClick={() => setOpen(false)}
                >
                  Sign in
                </Link>
              )}
            </div>
          </nav>
        </>
      )}
    </div>
  );
}
