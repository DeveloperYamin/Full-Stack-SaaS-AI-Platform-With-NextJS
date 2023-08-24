"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export default function CrispChat() {
  useEffect(() => {
    Crisp.configure("37df94af-f50d-45a9-92ed-c6e7d055a83f");
  }, []);
  return null;
}
