import { motion } from 'motion/react';
import type { ReactNode, CSSProperties } from 'react';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  style?: CSSProperties;
}

const Reveal = ({ children, delay = 0, className, style }: RevealProps) => (
  <motion.div
    className={className}
    style={style}
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '0px 0px -80px 0px' }}
    transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
  >
    {children}
  </motion.div>
);

export default Reveal;
