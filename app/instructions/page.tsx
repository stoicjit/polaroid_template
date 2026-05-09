"use client";

import { useRouter } from "next/navigation";
import NameGate from "@/components/NameGate";
import { useI18n } from "@/components/I18nProvider";

export default function Instructions() {
  const router = useRouter();
  const { t } = useI18n();

  return (
    <main className="h-screen flex flex-col items-center justify-center bg-black text-white p-6 text-center gap-6">
      <h1 className="text-xl">{t("instructions.title")}</h1>

      <p className="opacity-70 max-w-sm">{t("instructions.body")}</p>

      <NameGate />

      <button
        onClick={() => router.push("/app")}
        className="bg-white text-black px-4 py-2 rounded w-full max-w-xs"
      >
        {t("instructions.enterEvent")}
      </button>
    </main>
  );
}
