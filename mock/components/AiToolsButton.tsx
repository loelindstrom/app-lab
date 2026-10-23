import React, { useEffect, useState, type ButtonHTMLAttributes } from "react";
import { Sparkles } from "lucide-react";
import { AttentionBadge, IconButton, type Attention } from "./controls";

export function AiToolsButton({ motion = true, attention, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & {
  motion?: boolean;
  attention?: Attention;
}) {
  const [shimmer, setShimmer] = useState(motion);
  useEffect(() => {
    setShimmer(motion);
    if (!motion) return;
    const timer = window.setTimeout(() => setShimmer(false), 5000);
    return () => window.clearTimeout(timer);
  }, [motion]);

  return <IconButton {...props} className="tools-trigger ai-tools-button" label="Open app tools" data-shimmer={shimmer}>
    <Sparkles className="ai-tools-stars" size={20} />{attention && <AttentionBadge {...attention} />}
  </IconButton>;
}
