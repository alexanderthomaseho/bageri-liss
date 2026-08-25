import { defineConfig } from "tinacms";
import nextConfig from '../next.config'

import Post from "./collection/post";
import Global from "./collection/global";
import Author from "./collection/author";
import Page from "./collection/page";
import Tag from "./collection/tag";
import Bageri from "./collection/bageri";

const config = defineConfig({
  telemetry: 'disabled',
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID!,
  branch:
    process.env.NEXT_PUBLIC_TINA_BRANCH! || // custom branch env override
    process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF! || // Vercel branch env
    process.env.HEAD!, // Netlify branch env
  token: process.env.TINA_TOKEN!,
  media: {
    // If you wanted cloudinary do this
    // loadCustomStore: async () => {
    //   const pack = await import("next-tinacms-cloudinary");
    //   return pack.TinaCloudCloudinaryMediaStore;
    // },
    // this is the config for the tina cloud media store
    tina: {
      publicFolder: "public",
      mediaRoot: "uploads",
    },
  },
  build: {
    // Vite lauscht sonst auf "localhost", was hier auf IPv6-Loopback ([::1])
    // faellt - 127.0.0.1 wird dann abgewiesen. Der Dev-Proxy in next.config.ts
    // braucht aber eine feste Adresse. 127.0.0.1 bleibt reines Loopback, der
    // Server ist also weiterhin nicht von aussen erreichbar.
    host: "127.0.0.1",
    publicFolder: "public", // The public asset folder for your framework
    outputFolder: "admin", // within the public folder
    basePath: nextConfig.basePath?.replace(/^\//, '') || '', // The base path of the app (could be /blog)
  },
  schema: {
    collections: [Page, Post, Author, Tag, Global, Bageri],
  },
});

export default config;
