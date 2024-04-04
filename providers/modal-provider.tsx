"use client";
import { useState, useEffect } from "react";

// Modals

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  });

  if (!isMounted) {
    return null;
  }

  return <></>;
};

export default ModalProvider;
