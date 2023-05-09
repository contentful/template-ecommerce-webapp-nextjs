import { useEffect, useRef, useState } from 'react';

export const useSticky = () => {
  const stickyRef = useRef<HTMLDivElement>(null);
  const [sticky, setSticky] = useState(false);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (!stickyRef.current) {
      return;
    }
    setOffset(stickyRef.current.offsetTop);
  }, [stickyRef, setOffset]);

  useEffect(() => {
    const handleScroll = () => {
      if (!stickyRef.current) {
        return;
      }

      setSticky(window.scrollY > offset);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setSticky, stickyRef, offset]);
  return { stickyRef, sticky };
};
