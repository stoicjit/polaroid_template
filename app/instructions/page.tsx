"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { loadGuestOnboardingComplete } from "@/lib/guest";

export default function Instructions() {
  const router = useRouter();

  useEffect(() => {
    const target = loadGuestOnboardingComplete() ? "/app" : "/welcome";
    router.replace(target);
  }, [router]);

  return null;
}
