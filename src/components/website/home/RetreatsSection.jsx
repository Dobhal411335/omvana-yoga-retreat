"use client";

import { useEffect, useRef } from "react";

import { Container } from "@/components/common/Container";

const TRUSTMARY_WIDGET_SRC = "https://widget.trustmary.com/Fbk92mwF9";

export function RetreatsSection() {
  const widgetRef = useRef(null);

  useEffect(() => {
    const container = widgetRef.current;
    if (!container) return undefined;

    const script = document.createElement("script");
    script.src = TRUSTMARY_WIDGET_SRC;
    script.async = true;
    container.appendChild(script);

    return () => {
      container.replaceChildren();
    };
  }, []);

  return (
      <Container>
        <div ref={widgetRef} />
      </Container>
  );
}
