"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import type { SessionUser } from "@/lib/auth-types";

interface LoginFormProps {
  users: SessionUser[];
}

function AccountCard({
  user,
  disabled,
  isLoading,
  onLogin,
  variant,
}: {
  user: SessionUser;
  disabled: boolean;
  isLoading: boolean;
  onLogin: () => void;
  variant: "buyer" | "artisan";
}) {
  const accent =
    variant === "artisan"
      ? "hover:ring-emerald-200 hover:bg-emerald-50/40"
      : "hover:ring-amber-200 hover:bg-amber-50/40";

  return (
    <div
      className={`flex items-center justify-between gap-4 rounded-[1rem] bg-nyuzi-cream/60 p-4 ring-1 ring-stone-200/80 transition ${accent}`}
    >
      <div className="min-w-0">
        <p className="font-semibold text-nyuzi-ink">{user.fullName}</p>
        <p className="truncate text-sm text-nyuzi-muted">{user.email}</p>
      </div>
      <Button
        size="sm"
        variant={variant === "artisan" ? "secondary" : "primary"}
        disabled={disabled}
        onClick={onLogin}
        className="shrink-0"
      >
        {isLoading ? "Signing in…" : variant === "artisan" ? "Dashboard" : "Continue"}
      </Button>
    </div>
  );
}

export function LoginForm({ users }: LoginFormProps) {
  const router = useRouter();
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin(user: SessionUser) {
    setLoadingId(user.id);
    setError(null);

    const result = await signIn("demo", {
      userId: user.id,
      redirect: false,
    });

    setLoadingId(null);

    if (result?.error) {
      setError("Sign in failed. Please try again.");
      return;
    }

    if (user.role === "artisan") {
      router.push("/artisan/dashboard");
    } else {
      router.push("/");
    }
    router.refresh();
  }

  const buyers = users.filter((u) => u.role === "buyer");
  const artisans = users.filter((u) => u.role === "artisan");

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xs font-semibold uppercase tracking-wider text-nyuzi-muted">
          Buyer
        </h2>
        <div className="mt-3 space-y-2">
          {buyers.map((user) => (
            <AccountCard
              key={user.id}
              user={user}
              variant="buyer"
              disabled={loadingId !== null}
              isLoading={loadingId === user.id}
              onLogin={() => handleLogin(user)}
            />
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xs font-semibold uppercase tracking-wider text-nyuzi-muted">
          Artisans
        </h2>
        <div className="mt-3 space-y-2">
          {artisans.map((user) => (
            <AccountCard
              key={user.id}
              user={user}
              variant="artisan"
              disabled={loadingId !== null}
              isLoading={loadingId === user.id}
              onLogin={() => handleLogin(user)}
            />
          ))}
        </div>
      </div>

      {error && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-100">
          {error}
        </p>
      )}
    </div>
  );
}
