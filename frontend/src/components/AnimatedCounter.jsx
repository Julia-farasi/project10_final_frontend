// src/components/AnimatedCounter.jsx
import { useEffect, useState } from "react";
import { useMotionValue, animate } from "framer-motion";

export default function AnimatedCounter({ to, prefix = "", colorClass = "" }) {
  const [display, setDisplay] = useState(0);
  const motionValue = useMotionValue(0);

  useEffect(() => {
    const controls = animate(motionValue, to, {
      duration: 1.4,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(v.toFixed(2)),
    });
    return () => controls.stop();
  }, [to]);

  return (
    <span className={`font-semibold ${colorClass}`}>
      {prefix}
      {display} €
    </span>
  );
}
