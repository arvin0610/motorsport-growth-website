"use client";

import { useEffect, useState } from "react";

interface Props {
  /** IANA tz, default America/Los_Angeles */
  tz?: string;
  /** Label shown after the time (e.g. "PT", "UTC") */
  suffix?: string;
  className?: string;
}

/**
 * Live clock — ticks every second, defaults to Pacific.
 * Mono-width via JetBrains Mono `tnum` so digits don't shift.
 */
export function LiveClock({ tz = "America/Los_Angeles", suffix = "PT", className = "" }: Props) {
  const [time, setTime] = useState<string>("--:--:--");

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-US", {
      timeZone: tz,
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    const update = () => setTime(fmt.format(new Date()));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [tz]);

  return (
    <span className={`t-mono ${className}`}>
      {time} {suffix}
    </span>
  );
}
