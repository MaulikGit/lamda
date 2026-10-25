'use client';

import { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  className?: string;
}

export default function Reveal({
  children,
  delay = 0,
  duration = 0.4,
  yOffset = 64,
  className = '',
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ 
        opacity: 0, 
        y: shouldReduceMotion ? 0 : yOffset 
      }}
      whileInView={{ 
        opacity: 1, 
        y: 0 
      }}
      viewport={{ once: true, amount: 'some' }}
      transition={{
        duration: duration,
        delay: delay,
        ease: [0.44, 0, 0.56, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
