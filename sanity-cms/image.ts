import createImageUrlBuilder from "@sanity/image-url";

import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { dataset, projectId } from "./env";

// https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder({ projectId, dataset });

export const urlFor = (image: SanityImageSource) => {
  return builder.image(image).auto("format");
};
