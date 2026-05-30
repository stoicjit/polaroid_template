"use client";

import { useI18n } from "@/components/I18nProvider";
import type { ChangeEvent } from "react";

type NameGateProps = {
  value: string;
  onChange: (nextValue: string) => void;
};

export default function NameGate({ value, onChange }: NameGateProps) {
  const { t } = useI18n();

  return (
    <div className="w-full max-w-2xl px-1 text-left">
      <label className="sr-only">{t("instructions.nameLabel")}</label>
      <div className="rounded-[24px] border border-[#d7c7b0] bg-white/82 px-4 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.08)] backdrop-blur-sm transition focus-within:border-[#8b6e52] focus-within:bg-white">
        <input
          value={value}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            onChange(event.target.value)
          }
          className="w-full bg-transparent text-center text-base text-[#332613] outline-none placeholder:text-[#9d8b73]"
          placeholder={t("nameGate.placeholder")}
        />
      </div>
    </div>
  );
}
