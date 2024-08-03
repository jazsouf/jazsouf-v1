"use client";
import { Fragment } from "react";
import { useEffect, useState } from "react";

export default function ClientOnly({ children, ...delegated }) {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);
  if (!hasMounted) {
    return null;
  }
  return <Fragment {...delegated}>{children}</Fragment>;
}
