"use client";

import { z } from "zod";
import Link from "next/link";
import { useForm } from "@tanstack/react-form";
import {
  OctagonAlertIcon,
  EyeIcon,
  EyeOffIcon,
  Loader2Icon,
  ArrowRightIcon,
  ShieldCheckIcon,
  MailIcon,
  LockIcon,
  CheckCircle2Icon,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";

import { authClient } from "@/lib/auth-client";

const formSchema = z.object({
  email: z.string().email("Please enter a valid work email."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" aria-hidden="true">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"
    />
  </svg>
);

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="currentColor" aria-hidden="true">
    <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5z" />
  </svg>
);

// Shared input styling (hover + focus effects)
const inputBase =
  "h-11 rounded-xl border border-zinc-200 bg-zinc-50/60 pl-10 text-base text-zinc-900 shadow-xs " +
  "transition-all duration-200 placeholder:text-zinc-400 sm:text-sm " +
  "hover:border-emerald-500/50 hover:bg-white hover:shadow-md hover:shadow-emerald-900/5 " +
  "focus-visible:border-emerald-600 focus-visible:bg-white focus-visible:ring-4 focus-visible:ring-emerald-600/15 " +
  "dark:border-zinc-800 dark:bg-zinc-800/40 dark:text-zinc-100 dark:hover:border-emerald-500/50 dark:hover:bg-zinc-800/70 dark:focus-visible:border-emerald-500";

const inputInvalid =
  "border-rose-500 bg-rose-50/30 hover:border-rose-500 focus-visible:border-rose-500 focus-visible:ring-rose-500/15";

const iconClass =
  "pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400 transition-colors duration-200 " +
  "group-hover/input:text-emerald-600 group-focus-within/input:text-emerald-600";

const socialBtn =
  "group/social h-11 gap-2 rounded-xl border border-zinc-200/90 bg-white text-sm font-semibold text-zinc-700 shadow-xs cursor-pointer " +
  "transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-500/40 hover:bg-emerald-50 hover:text-emerald-800 hover:shadow-md hover:shadow-emerald-900/10 " +
  "active:translate-y-0 active:scale-[0.98] " +
  "dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-emerald-500/40 dark:hover:bg-emerald-950/40 dark:hover:text-emerald-200";

export const SignInView = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      setError(null);
      setIsPending(true);

      try {
        await authClient.signIn.email(
          {
            email: value.email,
            password: value.password,
          },
        
          {
            onSuccess: () => {
              setIsPending(false);
              router.push("/");
              router.refresh();
            },
            onError: (ctx) => {
              setIsPending(false);
              setError(ctx.error.message || "Invalid credentials.");
            },
          }
        );
      } catch {
        setIsPending(false);
        setError("An unexpected error occurred. Please try again.");
      }
    },
  });

  return (
    <div className="relative flex min-h-[100dvh] w-full items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-teal-50 px-4 py-6 antialiased selection:bg-emerald-500 selection:text-white dark:from-[#04100a] dark:via-[#090a0b] dark:to-[#06140f] sm:px-6">
      {/* ===== Full-page background (covers the whole screen) ===== */}
      <div className="pointer-events-none absolute inset-0 -z-0">
        <div className="absolute -left-32 -top-32 h-[420px] w-[420px] animate-pulse rounded-full bg-emerald-400/25 blur-[110px] dark:bg-emerald-600/20" />
        <div className="absolute -bottom-40 -right-32 h-[460px] w-[460px] animate-pulse rounded-full bg-teal-400/25 blur-[120px] [animation-delay:1.5s] dark:bg-teal-600/15" />
        <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-300/20 blur-[100px] dark:bg-green-700/10" />
        <div
          className="absolute inset-0 text-emerald-900 opacity-[0.05] dark:text-white dark:opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage:
              "radial-gradient(ellipse at center, black 30%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-[1040px] animate-in fade-in zoom-in-95 duration-500">
        {/* ===== Card: fixed height on laptop so no page scroll ===== */}
        <Card className="group/card relative gap-0 overflow-hidden rounded-3xl border border-zinc-200/80 bg-white/90 py-0 shadow-[0_30px_80px_-20px_rgba(6,78,59,0.25)] backdrop-blur-xl transition-all duration-500 hover:shadow-[0_40px_100px_-20px_rgba(6,78,59,0.35)] dark:border-zinc-800/80 dark:bg-zinc-900/90 md:h-[min(640px,calc(100dvh-6.5rem))]">
          <CardContent className="grid h-full p-0 md:grid-cols-12">
            {/* ================= LEFT: FORM ================= */}
            <div className="flex flex-col justify-center overflow-y-auto p-6 sm:p-10 md:col-span-7 md:px-10 md:py-6 lg:px-14">
              {/* Brand */}
              <div className="group/brand flex w-fit cursor-default items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600/10 p-1.5 ring-1 ring-emerald-600/20 transition-all duration-300 group-hover/brand:rotate-6 group-hover/brand:scale-110 group-hover/brand:bg-emerald-600/20 dark:bg-emerald-500/15">
                  <Image
                    src="/logo.png"
                    alt="Meet.AI Logo"
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                </div>
                <span className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                  Meet.AI
                </span>
              </div>

              <div className="mb-5 mt-6">
                <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">
                  Welcome back
                </h1>
                <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400">
                  Enter your credentials to access your workspaces.
                </p>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  form.handleSubmit();
                }}
                className="space-y-3.5"
              >
                {/* Email */}
                <form.Field
                  name="email"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid} className="flex flex-col gap-1.5">
                        <FieldLabel
                          htmlFor={field.name}
                          className="text-xs font-medium text-zinc-700 dark:text-zinc-300"
                        >
                          Email address
                        </FieldLabel>
                        <div className="group/input relative">
                          <MailIcon className={iconClass} />
                          <Input
                            id={field.name}
                            name={field.name}
                            type="email"
                            autoComplete="email"
                            placeholder="name@company.com"
                            className={`${inputBase} pr-3.5 ${isInvalid ? inputInvalid : ""}`}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            aria-invalid={isInvalid}
                          />
                        </div>
                        {isInvalid && (
                          <FieldError
                            errors={field.state.meta.errors}
                            className="text-xs text-rose-500"
                          />
                        )}
                      </Field>
                    );
                  }}
                />

                {/* Password */}
                <form.Field
                  name="password"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid} className="flex flex-col gap-1.5">
                        <div className="flex items-center justify-between">
                          <FieldLabel
                            htmlFor={field.name}
                            className="text-xs font-medium text-zinc-700 dark:text-zinc-300"
                          >
                            Password
                          </FieldLabel>
                          <Link
                            href="/auth/forgot-password"
                            className="group/forgot relative text-xs font-medium text-emerald-600 transition-colors hover:text-emerald-700 dark:text-emerald-400"
                          >
                            Forgot password?
                            <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-emerald-600 transition-all duration-300 group-hover/forgot:w-full" />
                          </Link>
                        </div>
                        <div className="group/input relative">
                          <LockIcon className={iconClass} />
                          <Input
                            id={field.name}
                            name={field.name}
                            type={showPassword ? "text" : "password"}
                            autoComplete="current-password"
                            placeholder="••••••••"
                            className={`${inputBase} pr-11 ${isInvalid ? inputInvalid : ""}`}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            aria-invalid={isInvalid}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword((s) => !s)}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                            className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-lg text-zinc-400 transition-all duration-200 hover:bg-emerald-600/10 hover:text-emerald-700 active:scale-90 dark:hover:text-emerald-300"
                          >
                            {showPassword ? (
                              <EyeOffIcon className="h-4 w-4" />
                            ) : (
                              <EyeIcon className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                        {isInvalid && (
                          <FieldError
                            errors={field.state.meta.errors}
                            className="text-xs text-rose-500"
                          />
                        )}
                      </Field>
                    );
                  }}
                />

                {/* Error */}
                {error && (
                  <Alert className="flex items-center gap-2.5 rounded-xl border border-rose-500/20 bg-rose-50/60 p-3 text-rose-600 dark:border-rose-500/30 dark:bg-rose-950/30 dark:text-rose-400">
                    <OctagonAlertIcon className="h-4 w-4 shrink-0" />
                    <AlertTitle className="m-0 text-xs font-medium leading-none">
                      {error}
                    </AlertTitle>
                  </Alert>
                )}

                {/* Submit (lift + shine sweep on hover) */}
                <Button
                  type="submit"
                  disabled={isPending}
                  className="group/btn relative mt-1 flex h-11 w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 font-semibold text-white shadow-lg shadow-emerald-700/25 transition-all duration-200 hover:-translate-y-0.5 hover:from-emerald-500 hover:to-emerald-600 hover:shadow-xl hover:shadow-emerald-700/35 active:translate-y-0 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                >
                  <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full" />
                  {isPending ? (
                    <>
                      <Loader2Icon className="relative h-4 w-4 animate-spin" />
                      <span className="relative">Signing in...</span>
                    </>
                  ) : (
                    <>
                      <span className="relative">Sign In</span>
                      <ArrowRightIcon className="relative h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
                    </>
                  )}
                </Button>

                {/* Divider */}
                <div className="flex items-center gap-3 py-0.5">
                  <span className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
                  <span className="text-[11px] font-medium uppercase tracking-wide text-zinc-400 dark:text-zinc-500">
                    Or continue with
                  </span>
                  <span className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
                </div>

                {/* Social */}
                <div className="grid grid-cols-1 gap-3 min-[400px]:grid-cols-2">
                  <Button
                    variant="outline"
                    type="button"
                    disabled={isPending}
                    className={socialBtn}
                    onClick={() => authClient.signIn.social({ provider: "google" })}
                  >
                    <span className="transition-transform duration-200 group-hover/social:scale-125">
                      <GoogleIcon />
                    </span>
                    Google
                  </Button>
                  <Button
                    variant="outline"
                    type="button"
                    disabled={isPending}
                    className={socialBtn}
                    onClick={() => authClient.signIn.social({ provider: "github" })}
                  >
                    <span className="transition-transform duration-200 group-hover/social:scale-125">
                      <GithubIcon />
                    </span>
                    GitHub
                  </Button>
                </div>
              </form>

              {/* Sign up */}
              <p className="mt-5 text-center text-sm text-zinc-500 dark:text-zinc-400">
                Don&apos;t have an account?{" "}
                <Link
                  href="/auth/sign-up"
                  className="group/signup relative inline-block font-semibold text-emerald-600 transition-colors hover:text-emerald-500 dark:text-emerald-400"
                >
                  Create an account
                  <span className="absolute -bottom-0.5 left-0 h-0.5 w-0 bg-emerald-500 transition-all duration-300 group-hover/signup:w-full" />
                </Link>
              </p>
            </div>

            {/* ================= RIGHT: HERO ================= */}
            <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-b from-[#064027] via-[#032316] to-[#01120b] p-8 text-white md:col-span-5 md:flex lg:p-10">
              {/* Glows + grid */}
              <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 animate-pulse rounded-full bg-emerald-500/25 blur-[80px]" />
              <div className="pointer-events-none absolute -bottom-24 -left-20 h-64 w-64 animate-pulse rounded-full bg-teal-500/20 blur-[90px] [animation-delay:1.5s]" />
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.07]"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                  backgroundSize: "22px 22px",
                }}
              />

              {/* Security pill */}
              <div className="relative z-10">
                <span className="inline-flex cursor-default items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[11px] font-medium text-emerald-300 backdrop-blur-md transition-all duration-300 hover:border-emerald-400/50 hover:bg-emerald-500/20 hover:shadow-[0_0_20px_rgba(52,211,153,0.3)]">
                  <ShieldCheckIcon className="h-3.5 w-3.5 text-emerald-400" />
                  SOC-2 Compliant &amp; Encrypted
                </span>
              </div>

              {/* Center */}
              <div className="relative z-10 py-4">
                <div className="group/logo mb-5 inline-flex cursor-default rounded-2xl border border-white/10 bg-white/[0.06] p-3 shadow-2xl ring-1 ring-white/10 backdrop-blur-xl transition-all duration-500 hover:scale-105 hover:bg-white/10 hover:ring-emerald-400/40">
                  <Image
                    src="/logo.png"
                    alt="Meet.AI Logo"
                    width={44}
                    height={44}
                    className="drop-shadow-lg transition-transform duration-500 group-hover/logo:rotate-6"
                    priority
                  />
                </div>
                <h2 className="text-2xl font-bold leading-tight tracking-tight text-white lg:text-[1.75rem]">
                  Supercharge your team meetings.
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-zinc-300/80">
                  Real-time audio intelligence, automatic summaries, and seamless calendar integrations.
                </p>

                <div className="mt-5 space-y-1.5">
                  {[
                    "Zero latency video streaming",
                    "Automated action items & notes",
                    "End-to-end privacy standard",
                  ].map((text) => (
                    <div
                      key={text}
                      className="group/feat flex cursor-default items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-xs text-zinc-300 transition-all duration-300 hover:translate-x-1.5 hover:bg-white/10 hover:text-white"
                    >
                      <CheckCircle2Icon className="h-4 w-4 shrink-0 text-emerald-400 transition-transform duration-300 group-hover/feat:scale-125" />
                      <span>{text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Testimonial */}
              <div className="relative z-10 cursor-default rounded-xl border border-white/10 bg-white/[0.05] p-3.5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/30 hover:bg-white/10">
                <p className="text-xs italic leading-relaxed text-zinc-300/90">
                  &ldquo;Meet.AI reduced our post-meeting documentation time by over 80%.&rdquo;
                </p>
                <div className="mt-2 flex items-center justify-between text-[11px] text-zinc-400">
                  <span className="font-medium text-zinc-200">Sarah Jenkins</span>
                  <span>VP of Product, Apex</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="mt-4 text-center text-xs text-zinc-500 dark:text-zinc-500">
          By signing in, you agree to our{" "}
          <Link
            href="#"
            className="text-zinc-600 underline underline-offset-4 transition-colors hover:text-emerald-700 dark:text-zinc-400 dark:hover:text-emerald-300"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="#"
            className="text-zinc-600 underline underline-offset-4 transition-colors hover:text-emerald-700 dark:text-zinc-400 dark:hover:text-emerald-300"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
};