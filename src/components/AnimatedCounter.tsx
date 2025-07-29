import React from 'react';
import { useCountUp } from '@/hooks/useCountUp';

interface AnimatedCounterProps {
  value: string;
  duration?: number;
  className?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ 
  value, 
  duration = 2000,
  className = ""
}) => {
  // Extract numeric value and suffix (like +, %)
  const numericMatch = value.match(/(\d+)/);
  const numericValue = numericMatch ? parseInt(numericMatch[1]) : 0;
  const suffix = value.replace(/\d+/, '');
  
  const { count, ref } = useCountUp(numericValue, duration);
  
  return (
    <span ref={ref} className={className}>
      {Math.floor(count)}{suffix}
    </span>
  );
};