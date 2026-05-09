"use client";

import { useState, useEffect } from "react";
import { signInAnonymously } from "firebase/auth";
import { auth } from "@/lib/firebase";
import UploadBox from "@/components/UploadBox";
import Gallery from "@/components/Gallery";
import { useI18n } from "@/components/I18nProvider";

export default function AppPage() {
  const [user, setUser] = useState(false);
  const { t } = useI18n();

  useEffect(() => {
    signInAnonymously(auth).then(() => setUser(true));
  }, []);

  if (!user) return <div>{t("app.loading")}</div>;

  return (
    <main className="min-h-screen bg-black text-white p-4">
      <UploadBox />
      <Gallery />
    </main>
  );
}
