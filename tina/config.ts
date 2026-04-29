import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  // Uncomment to allow cross-origin requests from non-localhost origins
  // during local development (e.g. GitHub Codespaces, Gitpod, Docker).
  // Use 'private' to allow all private-network IPs (WSL2, Docker, etc.)
  // server: {
  //   allowedOrigins: ['https://your-codespace.github.dev'],
  // },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/r/content-modelling-collections/
  schema: {
      collections: [
        // Existing post collection
        {
          name: "post",
          label: "Posts",
          path: "content/posts",
          fields: [
            { type: "string", name: "title", label: "Title", isTitle: true, required: true },
            { type: "rich-text", name: "body", label: "Body", isBody: true }
          ],
          ui: { router: ({ document }) => `/demo/blog/${document._sys.filename}` }
        },
        // New collection for site pages
        {
          name: "page",
          label: "Site Pages",
          path: "content/pages",
          fields: [
            {
              type: "object",
              name: "hero",
              label: "Hero",
              fields: [
                { type: "string", name: "imageSrc", label: "Image Source" },
                { type: "string", name: "imageAlt", label: "Image Alt" },
                { type: "string", name: "eyebrow", label: "Eyebrow" },
                { type: "string", name: "heading", label: "Heading" },
                { type: "string", name: "subheading", label: "Subheading" }
              ]
            }
          ]
        },
        // Theme collection (optional, for colour palette)
        {
          name: "theme",
          label: "Theme",
          path: "content/theme",
          fields: [
            { type: "string", name: "charcoal", label: "Charcoal" },
            { type: "string", name: "stone", label: "Stone" },
            { type: "string", name: "sand", label: "Sand" },
            { type: "string", name: "offwhite", label: "Offwhite" },
            { type: "string", name: "bronze", label: "Bronze" },
            { type: "string", name: "bronzePale", label: "Bronze Pale" }
          ]
        }
      ]
    },
});
