'use client';
import { Topbar, topbarBlockSchema } from './topbar';
import { Hero, heroBlockSchema } from './hero';
import { Welcome, welcomeBlockSchema } from './welcome';
import { Products, productsBlockSchema } from './products';
import { Gallery, galleryBlockSchema } from './gallery';
import { Hours, hoursBlockSchema } from './hours';
import { Find, findBlockSchema } from './find';
import { Footer, footerBlockSchema } from './footer';
import { RiseObserver } from './rise';

/** Die Reihenfolge im Inhalt bestimmt die Reihenfolge auf der Seite. */
export function BageriBlocks({ blocks }: { blocks: any[] }) {
  return (
    <div className="bageri">
      <RiseObserver />
      {(blocks ?? []).map((block, i) => {
        if (!block) return null;
        const key = `${block.__typename}-${i}`;
        switch (block.__typename) {
          case 'BageriBlocksTopbar':
            return <Topbar key={key} data={block} />;
          case 'BageriBlocksHero':
            return <Hero key={key} data={block} />;
          case 'BageriBlocksWelcome':
            return <Welcome key={key} data={block} />;
          case 'BageriBlocksProducts':
            return <Products key={key} data={block} />;
          case 'BageriBlocksGallery':
            return <Gallery key={key} data={block} />;
          case 'BageriBlocksHours':
            return <Hours key={key} data={block} />;
          case 'BageriBlocksFind':
            return <Find key={key} data={block} />;
          case 'BageriBlocksFooter':
            return <Footer key={key} data={block} />;
          default:
            return null;
        }
      })}
    </div>
  );
}

export const bageriBlockSchemas = [
  topbarBlockSchema,
  heroBlockSchema,
  welcomeBlockSchema,
  productsBlockSchema,
  galleryBlockSchema,
  hoursBlockSchema,
  findBlockSchema,
  footerBlockSchema,
];
