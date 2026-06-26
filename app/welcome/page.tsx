"use client";

import {
  useEffect,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type MouseEvent,
} from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import InstallGate from "@/components/InstallGate";
import NameGate from "@/components/NameGate";
import { useI18n } from "@/components/I18nProvider";
import {
  loadGuestName,
  saveGuestName,
  saveGuestOnboardingComplete,
  useGuestOnboardingComplete,
} from "@/lib/guest";
import { eventConfig } from "@/lib/event";
import styles from "./page.module.css";

function isStandaloneMode() {
  if (typeof window === "undefined") {
    return false;
  }

  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    // @ts-expect-error iOS Safari specific property
    window.navigator.standalone === true
  );
}

function useHasHydrated() {
  return useSyncExternalStore(
    () => () => { },
    () => true,
    () => false,
  );
}

export default function Welcome() {
  const router = useRouter();
  const { t } = useI18n();
  const onboardingComplete = useGuestOnboardingComplete();
  const [showLaunchSheet, setShowLaunchSheet] = useState(false);
  const [manualGreetingOpen, setManualGreetingOpen] = useState(false);
  const [name, setName] = useState(() => loadGuestName());
  const hydrated = useHasHydrated();
  const standalone = hydrated && isStandaloneMode();

  useEffect(() => {
    if (onboardingComplete) {
      router.replace("/app");
    }
  }, [onboardingComplete, router]);

  const activeName = name.trim();
  const showGreetingModal = manualGreetingOpen || (standalone && !onboardingComplete);

  const openLaunchSheet = () => {
    if (onboardingComplete) {
      router.replace("/app");
      return;
    }

    setShowLaunchSheet(true);
  };

  const openGreetingModal = () => {
    setShowLaunchSheet(false);
    setManualGreetingOpen(true);
  };

  const closeLaunchSheet = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      setShowLaunchSheet(false);
    }
  };

  const enterExperience = () => {
    if (!activeName) {
      return;
    }

    saveGuestName(activeName);
    saveGuestOnboardingComplete(true);
    router.replace("/app");
  };

  const buildPolaroidStyle = (p: (typeof eventConfig.welcomePhotos)[number], i: number) => {
    const style: CSSProperties & {
      "--base-rotate": string;
      "--float-delay": string;
    } = {
      "--base-rotate": p.rotate,
      "--float-delay": `${i * -2.8}s`,
    };

    if ("top" in p) {
      style.top = p.top;
    }

    if ("bottom" in p) {
      style.bottom = p.bottom;
    }

    if ("left" in p) {
      style.left = p.left;
    }

    if ("right" in p) {
      style.right = p.right;
    }

    return style;
  };

  return (
    <main
      className={styles.root}
      style={{ backgroundImage: `url(${eventConfig.welcomeBackground})` }}
    >
      {eventConfig.welcomePhotos.map((p, i) => (
        <div
          key={i}
          className={styles.polaroidWrap}
          style={buildPolaroidStyle(p, i)}
        >
          <div className={styles.polaroid}>
            <div className={styles.polaroidImg}>
              <Image
                src={p.src}
                alt={t("welcome.photoAlt")}
                fill
                className={styles.img}
                sizes="110px"
              />
            </div>
          </div>
        </div>
      ))}

      <div className={styles.content}>
        <p className={styles.eyebrow}>{t("welcome.eyebrow")}</p>

        <h1 className={styles.names}>
          <span className={styles.nameLine1}>{eventConfig.coupleNames[0]}</span>
          <span className={styles.amp}>&amp;</span>
          <span className={styles.nameLine}>{eventConfig.coupleNames[1]}</span>
        </h1>

        <div className={styles.divider}>
          <div className={styles.divLine} />
          <div className={styles.divDiamond} />
          <div className={styles.divLine} />
        </div>

        <p className={styles.landingText}>{t("welcome.landingText")}</p>

        <p className={styles.dateText}>{t("welcome.dateText")}</p>

        <button
          type="button"
          onClick={openLaunchSheet}
          className={styles.enterBtn}
        >
          <span className={styles.shine} aria-hidden="true" />
          <span>{t("welcome.enterApp")}</span>
        </button>
      </div>

      {showLaunchSheet ? (
        <div
          className={styles.overlay}
          role="presentation"
          onClick={closeLaunchSheet}
        >
          <div className={styles.sheet} role="dialog" aria-modal="true">
            <InstallGate onContinue={openGreetingModal} />
          </div>
        </div>
      ) : null}

      {showGreetingModal ? (
        <div className={styles.overlay} role="presentation">
          <div className={styles.greetingSheet} role="dialog" aria-modal="true">
            <div className={styles.greetingPolaroids}>
              {eventConfig.welcomePhotos.slice(0, 2).map((p, index) => (
                <div
                  key={`${p.src}-${index}`}
                  className={styles.greetingPolaroidWrap}
                  style={{ transform: `rotate(${p.rotate})` }}
                >
                  {/* Template keeps this as a decorative shell for future wedding photos. */}
                </div>
              ))}
            </div>

            <div className={styles.greetingCopy}>
              <p className={styles.greetingEyebrow}>{t("welcome.greetingEyebrow")}</p>
              <p className={styles.greetingText}>{t("welcome.greetingText")}</p>
              <p className={styles.greetingSubText}>{t("welcome.greetingSubText")}</p>

              <div className={styles.divider}>
                <div className={styles.divLine} />
                <div className={styles.divDiamond} />
                <div className={styles.divLine} />
              </div>

              <div className={styles.greetingNotes}>
                <p className={styles.greetingNote}>{t("welcome.noteOne")}</p>
                <p className={styles.greetingNote}>{t("welcome.noteTwo")}</p>
              </div>

              <div className={styles.nameWrap}>
                <NameGate value={name} onChange={setName} />
              </div>

              <button
                type="button"
                onClick={enterExperience}
                disabled={!activeName}
                className={styles.greetingEnter}
              >
                {t("welcome.enterEvent")}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
