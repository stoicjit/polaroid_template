"use client";

import { useI18n } from "@/components/I18nProvider";

export default function Gallery() {
  const { t } = useI18n();

  return (
    <div>
      <div className="grid grid-cols-2 gap-2">
        <div className="h-40 bg-white/10"></div>
        <div className="h-40 bg-white/10"></div>
      </div>
      <p className="mt-3 text-sm opacity-70">{t("app.placeholder")}</p>
    </div>
  );
}
