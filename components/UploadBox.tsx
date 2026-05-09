"use client";

import { useI18n } from "@/components/I18nProvider";

export default function UploadBox() {
  const { t } = useI18n();

  return (
    <div className="mb-4">
      <input type="file" />

      <button className="bg-white text-black px-3 py-1 ml-2">{t("upload.upload")}</button>
    </div>
  );
}
