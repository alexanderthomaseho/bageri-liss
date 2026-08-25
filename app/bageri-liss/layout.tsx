import { Pacifico, Fraunces, Karla } from 'next/font/google';
import '@/styles/bageri.css';

/**
 * Die drei Schriften der Bageri-Seite. In der Quelle lagen sie als data:-URIs
 * im Dokument, hier laedt sie next/font und stellt sie als CSS-Variablen
 * bereit - styles/bageri.css greift sie unter --f-script/--f-serif/--f-sans ab.
 */
const pacifico = Pacifico({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-pacifico',
  display: 'swap',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
});

const karla = Karla({
  subsets: ['latin'],
  variable: '--font-karla',
  display: 'swap',
});

export default function BageriLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${pacifico.variable} ${fraunces.variable} ${karla.variable}`}>
      {children}
    </div>
  );
}
