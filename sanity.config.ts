/**
 * This config is used to set up Sanity Studio that's mounted on the `/pages/studio/[[...index]].tsx` route
 */

import { visionTool } from "@sanity/vision";
import {
  apiVersion,
  dataset,
  previewSecretId,
  projectId,
} from "lib/sanity.api";
import { pageStructure, singletonPlugin } from "plugins/settings";
import { defineConfig } from "sanity";

import { structureTool } from "sanity/structure";
import art from "schemas/documents/art";
import page from "schemas/documents/page";
import project from "schemas/documents/project";
import duration from "schemas/objects/duration";
import milestone from "schemas/objects/milestone";
import timeline from "schemas/objects/timeline";
import home from "schemas/singletons/home";
import settings from "schemas/singletons/settings";

const title =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE ||
  "Soufiane El Jazouli's Personal Website";

export default defineConfig({
  basePath: "/studio",
  projectId: projectId || "",
  dataset: dataset || "",
  title,
  schema: {
    // If you want more content types, you can add them to this array
    types: [
      // Singletons
      home,
      settings,
      // Documents
      duration,
      page,
      project,
      art,
      // Objects
      milestone,
      timeline,
    ],
  },
  plugins: [
    structureTool({
      structure: pageStructure([home, settings]),
    }),
    // Configures the global "new document" button, and document actions, to suit the Settings document singleton
    singletonPlugin([home.name, settings.name]),
    // Add the "Open preview" action

    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
