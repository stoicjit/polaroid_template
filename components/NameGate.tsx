"use client";

import { useState } from "react";
import { useI18n } from "@/components/I18nProvider";

export default function NameGate() {
  const [name, setName] = useState("");
  const { t } = useI18n();

  const saveName = () => {
    localStorage.setItem("name", name);
  };

  return (
    <div className="mb-4">
      <input
        className="p-2 text-black"
        placeholder={t("nameGate.placeholder")}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={saveName} className="ml-2 bg-white text-black px-2">
        {t("nameGate.save")}
      </button>
    </div>
  );
}
