import React from 'react';
import TopHeader from '../Dashboard/TopHeader'; // Relative path to pre-existing component
import { cn } from '@/lib/utils';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  // TopHeader component (from context) already handles its own fixed positioning, height, background, and z-index.
  // This Header component acts as a wrapper, primarily for structural organization.
  // The className prop allows for potential overrides or additional wrapper styles.
  return (
    // The TopHeader itself is already a <header> element, so this can be a div or React.Fragment.
    // Using a div for consistency if any wrapper styles were to be added via className.
    <div role="banner">
      <TopHeader className={cn(className)} />
    </div>
  );
};

export default Header;
