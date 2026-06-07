"use client";

import { useState } from "react";
import CaptureTab from "./CaptureTab";
import GalleryTab from "./GalleryTab";
import styles from "./gallery.module.css";
import { useI18n } from "@/components/I18nProvider";

export type Tab = "capture" | "gallery";

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState<Tab>("capture");
  const { t } = useI18n();

  return (
    <main className={styles.root}>
      <div className={styles.header}>
        <p className={styles.headerTitle}>Gurdeep &amp; Idan</p>
        <p className={styles.headerSub}>13.09.2026</p>
      </div>

      <div className={styles.body}>
        {activeTab === "capture" ? <CaptureTab /> : <GalleryTab />}
      </div>

      <div className={styles.tabs}>
        <button
          type="button"
          className={`${styles.tab} ${activeTab === "capture" ? styles.tabActive : ""}`}
          onClick={() => setActiveTab("capture")}
        >
          <span className={styles.tabIcon}>
            <i className="ti ti-camera" aria-hidden="true" />
          </span>
          <span className={styles.tabLabel}>{t("tabs.capture")}</span>
        </button>
        <button
          type="button"
          className={`${styles.tab} ${activeTab === "gallery" ? styles.tabActive : ""}`}
          onClick={() => setActiveTab("gallery")}
        >
          <span className={styles.tabIcon}>
            <i className="ti ti-layout-grid" aria-hidden="true" />
          </span>
          <span className={styles.tabLabel}>{t("tabs.gallery")}</span>
        </button>
      </div>
    </main>
  );
}
