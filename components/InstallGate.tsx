"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { useI18n } from "@/components/I18nProvider";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

type InstallGateProps = {
  onContinue: () => void;
};

function isIosDevice() {
  if (typeof navigator === "undefined") return false;
  return /iphone|ipad|ipod/i.test(navigator.userAgent);
}

function useHasHydrated() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export default function InstallGate({ onContinue }: InstallGateProps) {
  const { t } = useI18n();
  const hydrated = useHasHydrated();
  const [canPromptInstall, setCanPromptInstall] = useState(false);
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);
      setCanPromptInstall(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
    };
  }, []);

  const isIos = hydrated && isIosDevice();

  const iosSteps = useMemo(
    () => [
      t("welcome.iosStepOne"),
      t("welcome.iosStepTwo"),
      t("welcome.iosStepThree"),
    ],
    [t],
  );

  async function handleInstall() {
    if (!deferredPrompt) {
      return;
    }

    await deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    setCanPromptInstall(false);

    if (choice.outcome === "accepted") {
      onContinue();
    }
  }

  if (!hydrated) {
    return (
      <div className="rounded-[28px] border border-white/40 bg-white/88 p-5 shadow-[0_12px_40px_rgba(0,0,0,0.16)] backdrop-blur-md">
        <p className="text-[10px] uppercase tracking-[0.35em] text-[#7b5d3c]">
          {t("welcome.installBadge")}
        </p>
        <p className="mt-2 text-sm text-[#3b2b1c]">
          {t("welcome.installHint")}
        </p>
      </div>
    );
  }

  if (isIos) {
    return (
      <div className="rounded-[28px] border border-white/40 bg-white/88 p-5 shadow-[0_12px_40px_rgba(0,0,0,0.16)] backdrop-blur-md">
        <p className="text-[10px] uppercase tracking-[0.35em] text-[#7b5d3c]">
          {t("welcome.installBadge")}
        </p>
        <p className="mt-2 text-sm text-[#3b2b1c]">
          {t("welcome.iosInstallHint")}
        </p>
        <div className="mt-4 flex items-center justify-center gap-3 rounded-3xl bg-[#faf7f2] px-4 py-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#cabaa6] bg-white text-[#1e140a]">
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 16V4" />
              <path d="M8.5 7.5 12 4l3.5 3.5" />
              <path d="M6 12v5.5A2.5 2.5 0 0 0 8.5 20h7A2.5 2.5 0 0 0 18 17.5V12" />
            </svg>
          </div>
          <div className="text-left">
            <p className="text-[10px] uppercase tracking-[0.35em] text-[#7b5d3c]">
              {t("welcome.iosShareLabel")}
            </p>
            <p className="text-sm text-[#4b3827]">Safari</p>
          </div>
        </div>
        <ol className="mt-4 grid gap-2 text-sm text-[#4b3827]">
          {iosSteps.map((step) => (
            <li key={step} className="rounded-2xl bg-[#faf7f2] px-3 py-2">
              {step}
            </li>
          ))}
        </ol>
      </div>
    );
  }

  if (canPromptInstall) {
    return (
      <div className="rounded-[28px] border border-white/40 bg-white/88 p-5 shadow-[0_12px_40px_rgba(0,0,0,0.16)] backdrop-blur-md">
        <p className="text-[10px] uppercase tracking-[0.35em] text-[#7b5d3c]">
          {t("welcome.installBadge")}
        </p>
        <p className="mt-2 text-sm text-[#3b2b1c]">
          {t("welcome.installDescription")}
        </p>
        <button
          type="button"
          onClick={handleInstall}
          className="mt-4 w-full rounded-full bg-[#1e140a] px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#faf7f2]"
        >
          {t("welcome.installCta")}
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-[28px] border border-white/40 bg-white/88 p-5 shadow-[0_12px_40px_rgba(0,0,0,0.16)] backdrop-blur-md">
      <p className="text-[10px] uppercase tracking-[0.35em] text-[#7b5d3c]">
        {t("welcome.installBadge")}
      </p>
      <p className="mt-2 text-sm text-[#3b2b1c]">
        {t("welcome.installHint")}
      </p>
    </div>
  );
}
