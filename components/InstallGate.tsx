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
  const [showShareHint, setShowShareHint] = useState(false);

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

  function renderIosStepIcon(stepIndex: number) {
    if (stepIndex === 0) {
      return (
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="h-5 w-5"
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
      );
    }

    if (stepIndex === 1) {
      return (
        <svg
  viewBox="0 0 24 24"
  aria-hidden="true"
  className="h-5 w-5"
  fill="none"
  stroke="currentColor"
  strokeWidth="1.8"
  strokeLinecap="round"
  strokeLinejoin="round"
>
  <rect x="3" y="3" width="18" height="18" rx="4" />
  <path d="M12 8v8" />
  <path d="M8 12h8" />
</svg>
      );
    }

    return (
      <svg
  viewBox="0 0 24 24"
  aria-hidden="true"
  className="h-5 w-5"
  fill="none"
  stroke="currentColor"
  strokeWidth="1.8"
  strokeLinecap="round"
  strokeLinejoin="round"
>
  {/* phone body */}
  <rect x="3" y="1" width="18" height="22" rx="4" />
  {/* screen inset */}
  <rect x="4.5" y="2.5" width="15" height="19" rx="2.5" strokeWidth="0.6" fillOpacity="0.06" fill="currentColor" />
  {/* dynamic island */}
  <rect x="9.5" y="4" width="5" height="1.8" rx="0.9" fill="currentColor" stroke="none" />
  {/* row 1 */}
  <rect x="6"    y="7.5" width="2.5" height="2.5" rx="0.5" fill="currentColor" stroke="none" />
  <rect x="10.8" y="7.5" width="2.5" height="2.5" rx="0.5" fill="currentColor" stroke="none" />
  <rect x="15.5" y="7.5" width="2.5" height="2.5" rx="0.5" fill="currentColor" stroke="none" />
  {/* row 2 */}
  <rect x="6"    y="11" width="2.5" height="2.5" rx="0.5" fill="currentColor" stroke="none" />
  <rect x="10.8" y="11" width="2.5" height="2.5" rx="0.5" fill="currentColor" stroke="none" />
  <rect x="15.5" y="11" width="2.5" height="2.5" rx="0.5" fill="currentColor" stroke="none" />
  {/* row 3 */}
  <rect x="6"    y="14.5" width="2.5" height="2.5" rx="0.5" fill="currentColor" stroke="none" />
  <rect x="10.8" y="14.5" width="2.5" height="2.5" rx="0.5" fill="currentColor" stroke="none" />
  {/* last icon outlined = newly added app */}
  <rect x="15.5" y="14.5" width="2.5" height="2.5" rx="0.5" strokeWidth="1.5" />
  {/* home indicator */}
  <line x1="10" y1="20.5" x2="14" y2="20.5" strokeWidth="2" />
</svg>
    );
  }

  const iosSteps = useMemo(
    () => [
      t("welcome.iosStepOne"),
      t("welcome.iosStepTwo"),
      t("welcome.iosStepThree"),
    ],
    [t],
  );

  async function handleOpenShareSheet() {
    if (typeof navigator === "undefined" || !navigator.share) {
      setShowShareHint(true);
      return;
    }

    try {
      await navigator.share({
        title: document.title,
        url: window.location.href,
      });
    } catch {
      setShowShareHint(true);
    }
  }

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
        <ol className="mt-4 grid gap-2 text-sm text-[#4b3827]">
          {iosSteps.map((step, stepIndex) => (
            <li
              key={step}
              className="grid grid-cols-[1fr_auto] items-center gap-3 rounded-2xl bg-[#faf7f2] px-4 py-3"
            >
              <span className="text-center leading-6">{step}</span>
              {stepIndex === 0 ? (
                <button
                  type="button"
                  onClick={handleOpenShareSheet}
                  aria-label={step}
                  className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-[#cabaa6] bg-white text-[#1e140a] transition-transform hover:scale-105 active:scale-95"
                >
                  {renderIosStepIcon(stepIndex)}
                </button>
              ) : (
                <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-[#cabaa6] bg-white text-[#1e140a]">
                  {renderIosStepIcon(stepIndex)}
                </span>
              )}
            </li>
          ))}
        </ol>
        {showShareHint ? (
          <p className="mt-3 rounded-2xl bg-[#faf7f2] px-3 py-2 text-sm text-[#4b3827]">
            Tap the Safari share button in the browser toolbar if the icon does not open anything.
          </p>
        ) : null}
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
