import type { SchemaTypeDefinition } from "sanity";

import { blockContentType } from "@/sanity-cms/schema/block-content";
import { authorType } from "@/sanity-cms/schema/documents/author";
import { categoryType } from "@/sanity-cms/schema/documents/category";
import { postType } from "@/sanity-cms/schema/documents/post";
import { artType } from "./documents/art";
import { homeType } from "./documents/home";
import { pageType } from "./documents/page";
import { projectType } from "./documents/project";
import { settingsType } from "./documents/settings";
import { duration } from "./objects/duration";
import { milestone } from "./objects/milestone";
import { timeline } from "./objects/timeline";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    artType,
    projectType,
    pageType,
    duration,
    milestone,
    timeline,
    homeType,
    settingsType,
    blockContentType,
    categoryType,
    postType,
    authorType,
  ],
};
