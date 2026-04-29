import { defineConfig } from "tinacms";

const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  "main";

export default defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },

  schema: {
    collections: [
      // ── Global site settings (theme colours) ─────────────────
      {
        name: "global",
        label: "Site Settings",
        path: "content/global",
        format: "json",
        match: { include: "index" },
        ui: {
          allowedActions: { create: false, delete: false },
          global: true,
        },
        fields: [
          {
            name: "theme",
            label: "Theme Colours",
            type: "object",
            fields: [
              { type: "string", name: "charcoal",   label: "Dark Background",  ui: { component: "color" } },
              { type: "string", name: "stone",      label: "Body Text",        ui: { component: "color" } },
              { type: "string", name: "sand",       label: "Sand Background",  ui: { component: "color" } },
              { type: "string", name: "offwhite",   label: "Light Background", ui: { component: "color" } },
              { type: "string", name: "bronze",     label: "Accent Bronze",    ui: { component: "color" } },
              { type: "string", name: "bronzePale", label: "Accent Light",     ui: { component: "color" } },
            ],
          },
        ],
      },

      // ── Page hero sections ────────────────────────────────────
      {
        name: "page",
        label: "Pages",
        path: "content/pages",
        format: "json",
        ui: {
          allowedActions: { create: false, delete: false },
          router: ({ document }) => {
            const map: Record<string, string> = {
              home:         "/",
              about:        "/about",
              tours:        "/tours",
              destinations: "/destinations",
              services:     "/services",
              contact:      "/contact",
              gallery:      "/gallery",
            };
            return map[document._sys.filename] ?? "/";
          },
        },
        fields: [
          {
            name: "hero",
            label: "Hero Section",
            type: "object",
            fields: [
              {
                type: "string",
                name: "imageSrc",
                label: "Hero Image URL",
                description: "Full URL — e.g. from Unsplash (right-click image → Copy image address)",
              },
              { type: "string", name: "imageAlt",   label: "Image Description (accessibility)" },
              { type: "string", name: "eyebrow",    label: "Eyebrow (small label above heading)" },
              { type: "string", name: "heading",    label: "Main Heading" },
              { type: "string", name: "subheading", label: "Subheading (optional)" },
            ],
          },
        ],
      },

      // ── Gallery images ────────────────────────────────────────
      {
        name: "gallery",
        label: "Gallery",
        path: "content/gallery",
        format: "json",
        match: { include: "index" },
        ui: {
          allowedActions: { create: false, delete: false },
        },
        fields: [
          {
            name: "images",
            label: "Images",
            type: "object",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: item.destination
                  ? `${item.destination} — ${String(item.alt ?? "").slice(0, 45)}`
                  : "New image",
              }),
            },
            fields: [
              { type: "string", name: "src",         label: "Image URL" },
              { type: "string", name: "alt",         label: "Description" },
              {
                type: "string",
                name: "destination",
                label: "Destination",
                options: ["Uzbekistan", "Pakistan", "Afghanistan", "China"],
              },
            ],
          },
        ],
      },
    ],
  },
});
