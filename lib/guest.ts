import { useSyncExternalStore } from "react";

export const GUEST_NAME_KEY = "guestName";
const GUEST_NAME_EVENT = "guestnamechange";
export const GUEST_ONBOARDING_KEY = "guestOnboardingComplete";
const GUEST_ONBOARDING_EVENT = "guestonboardingchange";

export function loadGuestName() {
  if (typeof window === "undefined") {
    return "";
  }

  return localStorage.getItem(GUEST_NAME_KEY) ?? "";
}

export function saveGuestName(name: string) {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(GUEST_NAME_KEY, name.trim());
  window.dispatchEvent(new Event(GUEST_NAME_EVENT));
}

function subscribeGuestName(onStoreChange: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  const handleStorage = () => onStoreChange();
  const handleGuestNameChange = () => onStoreChange();

  window.addEventListener("storage", handleStorage);
  window.addEventListener(GUEST_NAME_EVENT, handleGuestNameChange);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(GUEST_NAME_EVENT, handleGuestNameChange);
  };
}

export function useGuestName() {
  return useSyncExternalStore(subscribeGuestName, loadGuestName, () => "");
}

export function loadGuestOnboardingComplete() {
  if (typeof window === "undefined") {
    return false;
  }

  return localStorage.getItem(GUEST_ONBOARDING_KEY) === "true";
}

export function saveGuestOnboardingComplete(completed = true) {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(GUEST_ONBOARDING_KEY, completed ? "true" : "false");
  window.dispatchEvent(new Event(GUEST_ONBOARDING_EVENT));
}

function subscribeGuestOnboarding(onStoreChange: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  const handleStorage = () => onStoreChange();
  const handleGuestOnboardingChange = () => onStoreChange();

  window.addEventListener("storage", handleStorage);
  window.addEventListener(GUEST_ONBOARDING_EVENT, handleGuestOnboardingChange);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(
      GUEST_ONBOARDING_EVENT,
      handleGuestOnboardingChange,
    );
  };
}

export function useGuestOnboardingComplete() {
  return useSyncExternalStore(
    subscribeGuestOnboarding,
    loadGuestOnboardingComplete,
    () => false,
  );
}
