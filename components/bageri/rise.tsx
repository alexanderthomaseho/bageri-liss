'use client';
import { useEffect } from 'react';

/**
 * Blendet Elemente mit der Klasse `rise` ein, sobald sie in den Viewport
 * kommen. Uebernommen aus dem Skript am Ende von bageri-liss.html: ohne
 * IntersectionObserver oder bei reduzierter Bewegung sind alle sofort sichtbar.
 */
export function RiseObserver() {
  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>('.bageri .rise');

    if (
      !('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      items.forEach((el) => el.classList.add('in'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );

    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
