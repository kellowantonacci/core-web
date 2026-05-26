"use client";

import { useSyncExternalStore } from "react";
import { CoreWebPage } from "@/components/CoreWebPage";

const emptySubscribe = () => () => {};

export default function Home() {
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  if (!isClient) return null;

  return <CoreWebPage />;
}
