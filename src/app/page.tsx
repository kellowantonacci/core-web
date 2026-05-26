"use client";

import { useEffect, useState } from "react";
import { CoreWebPage } from "@/components/CoreWebPage";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <CoreWebPage />;
}
