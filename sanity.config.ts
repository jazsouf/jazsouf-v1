/**
 * This config is used to set up Sanity Studio that's mounted on the `/pages/studio/[[...index]].tsx` route
 */
import { visionTool } from "@sanity/vision";

import { apiVersion, dataset, projectId } from "@/sanity-cms/env";
import { defineConfig } from "sanity";

import { schema } from "@/sanity-cms/schemaTypes";

import { structure } from "@/sanity-cms/structure";

import { structureTool } from "sanity/structure";

const title = process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE || "Soufiane's Digital Space";

export default defineConfig({
  basePath: "/studio",
  projectId: projectId || "",
  dataset: dataset || "",
  title,
  schema,
  plugins: [
    structureTool({
      structure,
    }),

    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
