import type { SchemaTypeDefinition } from "sanity";

import { art } from "./documents/art";
import { home } from "./documents/home";
import { page } from "./documents/page";
import { project } from "./documents/project";
import { settings } from "./documents/settings";
import { duration } from "./objects/duration";
import { milestone } from "./objects/milestone";
import { timeline } from "./objects/timeline";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [art, project, page, duration, milestone, timeline, home, settings],
};
