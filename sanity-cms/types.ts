/**
 * ---------------------------------------------------------------------------------
 * This file has been generated by Sanity TypeGen.
 * Command: `sanity typegen generate`
 *
 * Any modifications made directly to this file will be overwritten the next time
 * the TypeScript definitions are generated. Please make changes to the Sanity
 * schema definitions and/or GROQ queries if you need to update these types.
 *
 * For more information on how to use Sanity TypeGen, visit the official documentation:
 * https://www.sanity.io/docs/sanity-typegen
 * ---------------------------------------------------------------------------------
 */

// Source: schema.json
export type SanityImagePaletteSwatch = {
  _type: "sanity.imagePaletteSwatch";
  background?: string;
  foreground?: string;
  population?: number;
  title?: string;
};

export type SanityImagePalette = {
  _type: "sanity.imagePalette";
  darkMuted?: SanityImagePaletteSwatch;
  lightVibrant?: SanityImagePaletteSwatch;
  darkVibrant?: SanityImagePaletteSwatch;
  vibrant?: SanityImagePaletteSwatch;
  dominant?: SanityImagePaletteSwatch;
  lightMuted?: SanityImagePaletteSwatch;
  muted?: SanityImagePaletteSwatch;
};

export type SanityImageDimensions = {
  _type: "sanity.imageDimensions";
  height?: number;
  width?: number;
  aspectRatio?: number;
};

export type SanityFileAsset = {
  _id: string;
  _type: "sanity.fileAsset";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  originalFilename?: string;
  label?: string;
  title?: string;
  description?: string;
  altText?: string;
  sha1hash?: string;
  extension?: string;
  mimeType?: string;
  size?: number;
  assetId?: string;
  uploadId?: string;
  path?: string;
  url?: string;
  source?: SanityAssetSourceData;
};

export type Geopoint = {
  _type: "geopoint";
  lat?: number;
  lng?: number;
  alt?: number;
};

export type Post = {
  _id: string;
  _type: "post";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title?: string;
  slug?: Slug;
  publishedAt?: string;
  isFeatured?: boolean;
  author?: {
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    [internalGroqTypeReferenceTo]?: "author";
  };
  mainImage?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt?: string;
    _type: "image";
  };
  categories?: Array<{
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    _key: string;
    [internalGroqTypeReferenceTo]?: "category";
  }>;
  excerpt?: string;
  body?: Array<{
    children?: Array<{
      marks?: Array<string>;
      text?: string;
      _type: "span";
      _key: string;
    }>;
    style?: "normal" | "h2" | "h3" | "blockquote";
    listItem?: "bullet" | "number";
    markDefs?: Array<{
      href?: string;
      _type: "link";
      _key: string;
    }>;
    level?: number;
    _type: "block";
    _key: string;
  } | {
    style?: "line" | "space";
    _type: "separator";
    _key: string;
  } | {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt?: string;
    _type: "image";
    _key: string;
  } | {
    _key: string;
  } & Code>;
};

export type Author = {
  _id: string;
  _type: "author";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  name?: string;
  slug?: Slug;
  image?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    _type: "image";
  };
};

export type Category = {
  _id: string;
  _type: "category";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title?: string;
  slug?: Slug;
};

export type BlockContent = Array<{
  children?: Array<{
    marks?: Array<string>;
    text?: string;
    _type: "span";
    _key: string;
  }>;
  style?: "normal" | "h2" | "h3" | "blockquote";
  listItem?: "bullet" | "number";
  markDefs?: Array<{
    href?: string;
    _type: "link";
    _key: string;
  }>;
  level?: number;
  _type: "block";
  _key: string;
} | {
  style?: "line" | "space";
  _type: "separator";
  _key: string;
} | {
  asset?: {
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
  };
  hotspot?: SanityImageHotspot;
  crop?: SanityImageCrop;
  alt?: string;
  _type: "image";
  _key: string;
} | {
  _key: string;
} & Code>;

export type Settings = {
  _id: string;
  _type: "settings";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  menuItems?: Array<{
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    [internalGroqTypeReferenceTo]?: "home";
  } | {
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    [internalGroqTypeReferenceTo]?: "page";
  } | {
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    [internalGroqTypeReferenceTo]?: "project";
  } | {
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    [internalGroqTypeReferenceTo]?: "post";
  }>;
  footer?: Array<{
    children?: Array<{
      marks?: Array<string>;
      text?: string;
      _type: "span";
      _key: string;
    }>;
    style?: "normal" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "blockquote";
    listItem?: "bullet" | "number";
    markDefs?: Array<{
      href?: string;
      _type: "link";
      _key: string;
    }>;
    level?: number;
    _type: "block";
    _key: string;
  }>;
  ogImage?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    _type: "image";
  };
};

export type Home = {
  _id: string;
  _type: "home";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title?: string;
  avatar?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    _type: "image";
  };
  overview?: Array<{
    children?: Array<{
      marks?: Array<string>;
      text?: string;
      _type: "span";
      _key: string;
    }>;
    style?: "normal";
    listItem?: never;
    markDefs?: Array<{
      href?: string;
      _type: "link";
      _key: string;
    }>;
    level?: number;
    _type: "block";
    _key: string;
  }>;
  showcaseProjects?: Array<{
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    _key: string;
    [internalGroqTypeReferenceTo]?: "project";
  }>;
  services?: Array<string>;
  stack?: Array<string>;
};

export type Timeline = {
  _type: "timeline";
  items?: Array<{
    title?: string;
    milestones?: Array<{
      _key: string;
    } & Milestone>;
    _type: "item";
    _key: string;
  }>;
};

export type Milestone = {
  _type: "milestone";
  title?: string;
  description?: string;
  image?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    _type: "image";
  };
  tags?: Array<string>;
  duration?: Duration;
};

export type Page = {
  _id: string;
  _type: "page";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title?: string;
  slug?: Slug;
  overview?: Array<{
    children?: Array<{
      marks?: Array<string>;
      text?: string;
      _type: "span";
      _key: string;
    }>;
    style?: "normal";
    listItem?: never;
    markDefs?: null;
    level?: number;
    _type: "block";
    _key: string;
  }>;
  body?: Array<{
    children?: Array<{
      marks?: Array<string>;
      text?: string;
      _type: "span";
      _key: string;
    }>;
    style?: "normal";
    listItem?: "bullet" | "number";
    markDefs?: Array<{
      href?: string;
      _type: "link";
      _key: string;
    }>;
    level?: number;
    _type: "block";
    _key: string;
  } | {
    _key: string;
  } & Timeline | {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    caption?: string;
    alt?: string;
    _type: "image";
    _key: string;
  }>;
};

export type Project = {
  _id: string;
  _type: "project";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title?: string;
  slug?: Slug;
  overview?: Array<{
    children?: Array<{
      marks?: Array<string>;
      text?: string;
      _type: "span";
      _key: string;
    }>;
    style?: "normal";
    listItem?: never;
    markDefs?: null;
    level?: number;
    _type: "block";
    _key: string;
  }>;
  coverImage?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    _type: "image";
  };
  extraImages?: Array<{
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    _type: "image";
    _key: string;
  }>;
  duration?: Duration;
  year?: string;
  client?: string;
  site?: string;
  services?: Array<string>;
  tags?: Array<string>;
  description?: Array<{
    children?: Array<{
      marks?: Array<string>;
      text?: string;
      _type: "span";
      _key: string;
    }>;
    style?: "normal";
    listItem?: "bullet" | "number";
    markDefs?: Array<{
      href?: string;
      _type: "link";
      _key: string;
    }>;
    level?: number;
    _type: "block";
    _key: string;
  } | {
    _key: string;
  } & Timeline | {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    caption?: string;
    alt?: string;
    _type: "image";
    _key: string;
  }>;
};

export type Duration = {
  _type: "duration";
  start?: string;
  end?: string;
};

export type Art = {
  _id: string;
  _type: "art";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title?: string;
  slug?: Slug;
  overview?: Array<{
    children?: Array<{
      marks?: Array<string>;
      text?: string;
      _type: "span";
      _key: string;
    }>;
    style?: "normal";
    listItem?: never;
    markDefs?: null;
    level?: number;
    _type: "block";
    _key: string;
  }>;
  image?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    _type: "image";
  };
};

export type SanityImageCrop = {
  _type: "sanity.imageCrop";
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
};

export type SanityImageHotspot = {
  _type: "sanity.imageHotspot";
  x?: number;
  y?: number;
  height?: number;
  width?: number;
};

export type SanityImageAsset = {
  _id: string;
  _type: "sanity.imageAsset";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  originalFilename?: string;
  label?: string;
  title?: string;
  description?: string;
  altText?: string;
  sha1hash?: string;
  extension?: string;
  mimeType?: string;
  size?: number;
  assetId?: string;
  uploadId?: string;
  path?: string;
  url?: string;
  metadata?: SanityImageMetadata;
  source?: SanityAssetSourceData;
};

export type SanityAssetSourceData = {
  _type: "sanity.assetSourceData";
  name?: string;
  id?: string;
  url?: string;
};

export type SanityImageMetadata = {
  _type: "sanity.imageMetadata";
  location?: Geopoint;
  dimensions?: SanityImageDimensions;
  palette?: SanityImagePalette;
  lqip?: string;
  blurHash?: string;
  hasAlpha?: boolean;
  isOpaque?: boolean;
};

export type Slug = {
  _type: "slug";
  current?: string;
  source?: string;
};

export type Code = {
  _type: "code";
  language?: string;
  filename?: string;
  code?: string;
  highlightedLines?: Array<number>;
};

export type AllSanitySchemaTypes = SanityImagePaletteSwatch | SanityImagePalette | SanityImageDimensions | SanityFileAsset | Geopoint | Post | Author | Category | BlockContent | Settings | Home | Timeline | Milestone | Page | Project | Duration | Art | SanityImageCrop | SanityImageHotspot | SanityImageAsset | SanityAssetSourceData | SanityImageMetadata | Slug | Code;
export declare const internalGroqTypeReferenceTo: unique symbol;
// Source: sanity-cms/queries.ts
// Variable: HOME_PAGE
// Query: *[  _type == "home" && defined(_id)][0]{    _id,    title,    avatar,    overview,    "showcaseProjects": coalesce(showcaseProjects[]->{      _type,      title,      "slug": coalesce(slug.current, ""),      coverImage,      overview,      services,      tags,      year    },[]),    services,    stack,  }
export type HOME_PAGEResult = {
  _id: string;
  title: string | null;
  avatar: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    _type: "image";
  } | null;
  overview: Array<{
    children?: Array<{
      marks?: Array<string>;
      text?: string;
      _type: "span";
      _key: string;
    }>;
    style?: "normal";
    listItem?: never;
    markDefs?: Array<{
      href?: string;
      _type: "link";
      _key: string;
    }>;
    level?: number;
    _type: "block";
    _key: string;
  }> | null;
  showcaseProjects: Array<{
    _type: "project";
    title: string | null;
    slug: string | "";
    coverImage: {
      asset?: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
      };
      hotspot?: SanityImageHotspot;
      crop?: SanityImageCrop;
      _type: "image";
    } | null;
    overview: Array<{
      children?: Array<{
        marks?: Array<string>;
        text?: string;
        _type: "span";
        _key: string;
      }>;
      style?: "normal";
      listItem?: never;
      markDefs?: null;
      level?: number;
      _type: "block";
      _key: string;
    }> | null;
    services: Array<string> | null;
    tags: Array<string> | null;
    year: string | null;
  }> | Array<never>;
  services: Array<string> | null;
  stack: Array<string> | null;
} | null;
// Variable: HOME_PAGE_TITLE
// Query: *[_type == "home"][0]{  title}
export type HOME_PAGE_TITLEResult = {
  title: string | null;
} | null;
// Variable: PAGE_BY_SLUG
// Query: *[  _type == "page" && slug.current == $slug && defined(_id)][0]{    _id,    body,    overview,    title,    "slug": coalesce(slug.current, ""),  }
export type PAGE_BY_SLUGResult = {
  _id: string;
  body: Array<{
    _key: string;
  } & Timeline | {
    children?: Array<{
      marks?: Array<string>;
      text?: string;
      _type: "span";
      _key: string;
    }>;
    style?: "normal";
    listItem?: "bullet" | "number";
    markDefs?: Array<{
      href?: string;
      _type: "link";
      _key: string;
    }>;
    level?: number;
    _type: "block";
    _key: string;
  } | {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    caption?: string;
    alt?: string;
    _type: "image";
    _key: string;
  }> | null;
  overview: Array<{
    children?: Array<{
      marks?: Array<string>;
      text?: string;
      _type: "span";
      _key: string;
    }>;
    style?: "normal";
    listItem?: never;
    markDefs?: null;
    level?: number;
    _type: "block";
    _key: string;
  }> | null;
  title: string | null;
  slug: string | "";
} | null;
// Variable: PROJECT_BY_SLUG
// Query: *[  _type == "project" && slug.current == $slug && defined(_id)][0]{    _id,    title,    "slug": coalesce(slug.current, ""),    overview,    coverImage,    extraImages,    client,    site,    services,    tags,    description,    duration,    year  }
export type PROJECT_BY_SLUGResult = {
  _id: string;
  title: string | null;
  slug: string | "";
  overview: Array<{
    children?: Array<{
      marks?: Array<string>;
      text?: string;
      _type: "span";
      _key: string;
    }>;
    style?: "normal";
    listItem?: never;
    markDefs?: null;
    level?: number;
    _type: "block";
    _key: string;
  }> | null;
  coverImage: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    _type: "image";
  } | null;
  extraImages: Array<{
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    _type: "image";
    _key: string;
  }> | null;
  client: string | null;
  site: string | null;
  services: Array<string> | null;
  tags: Array<string> | null;
  description: Array<{
    _key: string;
  } & Timeline | {
    children?: Array<{
      marks?: Array<string>;
      text?: string;
      _type: "span";
      _key: string;
    }>;
    style?: "normal";
    listItem?: "bullet" | "number";
    markDefs?: Array<{
      href?: string;
      _type: "link";
      _key: string;
    }>;
    level?: number;
    _type: "block";
    _key: string;
  } | {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    caption?: string;
    alt?: string;
    _type: "image";
    _key: string;
  }> | null;
  duration: Duration | null;
  year: string | null;
} | null;
// Variable: ART_BY_SLUG
// Query: *[  _type == "art" && slug.current == $slug][0]{  _id,  "slug": coalesce(slug.current, ""),  image,  overview,  title,  }
export type ART_BY_SLUGResult = {
  _id: string;
  slug: string | "";
  image: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    _type: "image";
  } | null;
  overview: Array<{
    children?: Array<{
      marks?: Array<string>;
      text?: string;
      _type: "span";
      _key: string;
    }>;
    style?: "normal";
    listItem?: never;
    markDefs?: null;
    level?: number;
    _type: "block";
    _key: string;
  }> | null;
  title: string | null;
} | null;
// Variable: PROJECT_SLUGS
// Query: *[  _type == "project" && defined(slug.current)]{  "slug": coalesce(slug.current, "")}
export type PROJECT_SLUGSResult = Array<{
  slug: string | "";
}>;
// Variable: ART_SLUGS
// Query: *[  _type == "art" && defined(slug.current)]{  "slug": coalesce(slug.current, "")}
export type ART_SLUGSResult = Array<{
  slug: string | "";
}>;
// Variable: PAGE_SLUGS
// Query: *[  _type == "page" && defined(slug.current)]{  "slug": coalesce(slug.current, "")}
export type PAGE_SLUGSResult = Array<{
  slug: string | "";
}>;
// Variable: SETTINGS
// Query: *[  _type == "settings"][0]{    footer,    "menuItems":coalesce(      menuItems[]->{_type, "slug": coalesce(slug.current, ""), title},      []    ),    ogImage,  }
export type SETTINGSResult = {
  footer: Array<{
    children?: Array<{
      marks?: Array<string>;
      text?: string;
      _type: "span";
      _key: string;
    }>;
    style?: "blockquote" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "normal";
    listItem?: "bullet" | "number";
    markDefs?: Array<{
      href?: string;
      _type: "link";
      _key: string;
    }>;
    level?: number;
    _type: "block";
    _key: string;
  }> | null;
  menuItems: Array<never> | Array<{
    _type: "home";
    slug: "";
    title: string | null;
  } | {
    _type: "page";
    slug: string | "";
    title: string | null;
  } | {
    _type: "post";
    slug: string | "";
    title: string | null;
  } | {
    _type: "project";
    slug: string | "";
    title: string | null;
  }>;
  ogImage: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    _type: "image";
  } | null;
} | null;
// Variable: TOTAL_POSTS
// Query: count(*[  _type == "post"  && defined(slug.current)  && (isFeatured != true || defined($category))  && select(defined($category) => $category in categories[]->slug.current, true)])
export type TOTAL_POSTSResult = number;
// Variable: POSTS
// Query: *[  _type == "post"  && defined(slug.current)  && (isFeatured != true || defined($category))  && select(defined($category) => $category in categories[]->slug.current, true)]|order(publishedAt desc)[$startIndex...$endIndex]{  title,  "slug": slug.current,  publishedAt,  excerpt,  author->{    name,    image,  },  categories[]->{    title,    "slug": slug.current,  }}
export type POSTSResult = Array<{
  title: string | null;
  slug: string | null;
  publishedAt: string | null;
  excerpt: string | null;
  author: {
    name: string | null;
    image: {
      asset?: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
      };
      hotspot?: SanityImageHotspot;
      crop?: SanityImageCrop;
      _type: "image";
    } | null;
  } | null;
  categories: Array<{
    title: string | null;
    slug: string | null;
  }> | null;
}>;
// Variable: FEATURED_POSTS
// Query: *[  _type == "post"  && isFeatured == true  && defined(slug.current)]|order(publishedAt desc)[0...$quantity]{  title,  "slug": slug.current,  publishedAt,  mainImage,  excerpt,  author->{    name,    image,  },}
export type FEATURED_POSTSResult = Array<{
  title: string | null;
  slug: string | null;
  publishedAt: string | null;
  mainImage: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt?: string;
    _type: "image";
  } | null;
  excerpt: string | null;
  author: {
    name: string | null;
    image: {
      asset?: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
      };
      hotspot?: SanityImageHotspot;
      crop?: SanityImageCrop;
      _type: "image";
    } | null;
  } | null;
}>;
// Variable: FEED_POSTS
// Query: *[  _type == "post"  && defined(slug.current)]|order(isFeatured, publishedAt desc){  title,  "slug": slug.current,  publishedAt,  mainImage,  excerpt,  author->{    name,  },}
export type FEED_POSTSResult = Array<{
  title: string | null;
  slug: string | null;
  publishedAt: string | null;
  mainImage: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt?: string;
    _type: "image";
  } | null;
  excerpt: string | null;
  author: {
    name: string | null;
  } | null;
}>;
// Variable: POST
// Query: *[  _type == "post"  && slug.current == $slug][0]{  publishedAt,  title,  mainImage,  excerpt,  body,  author->{    name,    image,  },  categories[]->{    title,    "slug": slug.current,  }}
export type POSTResult = {
  publishedAt: string | null;
  title: string | null;
  mainImage: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt?: string;
    _type: "image";
  } | null;
  excerpt: string | null;
  body: Array<{
    _key: string;
  } & Code | {
    children?: Array<{
      marks?: Array<string>;
      text?: string;
      _type: "span";
      _key: string;
    }>;
    style?: "blockquote" | "h2" | "h3" | "normal";
    listItem?: "bullet" | "number";
    markDefs?: Array<{
      href?: string;
      _type: "link";
      _key: string;
    }>;
    level?: number;
    _type: "block";
    _key: string;
  } | {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt?: string;
    _type: "image";
    _key: string;
  } | {
    style?: "line" | "space";
    _type: "separator";
    _key: string;
  }> | null;
  author: {
    name: string | null;
    image: {
      asset?: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
      };
      hotspot?: SanityImageHotspot;
      crop?: SanityImageCrop;
      _type: "image";
    } | null;
  } | null;
  categories: Array<{
    title: string | null;
    slug: string | null;
  }> | null;
} | null;
// Variable: CATEGORIES
// Query: *[  _type == "category"  && count(*[_type == "post" && defined(slug.current) && ^._id in categories[]._ref]) > 0]|order(title asc){  title,  "slug": slug.current,}
export type CATEGORIESResult = Array<{
  title: string | null;
  slug: string | null;
}>;

// Query TypeMap
import "@sanity/client";
declare module "@sanity/client" {
  interface SanityQueries {
    "*[\n  _type == \"home\" && defined(_id)\n][0]{\n    _id,\n    title,\n    avatar,\n    overview,\n    \"showcaseProjects\": coalesce(showcaseProjects[]->{\n      _type,\n      title,\n      \"slug\": coalesce(slug.current, \"\"),\n      coverImage,\n      overview,\n      services,\n      tags,\n      year\n    },[]),\n    services,\n    stack,\n  }": HOME_PAGEResult;
    "*[_type == \"home\"][0]{\n  title\n}": HOME_PAGE_TITLEResult;
    "*[\n  _type == \"page\" && slug.current == $slug && defined(_id)\n][0]{\n    _id,\n    body,\n    overview,\n    title,\n    \"slug\": coalesce(slug.current, \"\"),\n  }": PAGE_BY_SLUGResult;
    "*[\n  _type == \"project\" && slug.current == $slug && defined(_id)\n][0]{\n    _id,\n    title,\n    \"slug\": coalesce(slug.current, \"\"),\n    overview,\n    coverImage,\n    extraImages,\n    client,\n    site,\n    services,\n    tags,\n    description,\n    duration,\n    year\n  }": PROJECT_BY_SLUGResult;
    "*[\n  _type == \"art\" && slug.current == $slug\n][0]{\n  _id,\n  \"slug\": coalesce(slug.current, \"\"),\n  image,\n  overview,\n  title,\n  }": ART_BY_SLUGResult;
    "*[\n  _type == \"project\" && defined(slug.current)\n]{\n  \"slug\": coalesce(slug.current, \"\")\n}": PROJECT_SLUGSResult;
    "*[\n  _type == \"art\" && defined(slug.current)\n]{\n  \"slug\": coalesce(slug.current, \"\")\n}": ART_SLUGSResult;
    "*[\n  _type == \"page\" && defined(slug.current)\n]{\n  \"slug\": coalesce(slug.current, \"\")\n}": PAGE_SLUGSResult;
    "*[\n  _type == \"settings\"\n][0]{\n    footer,\n    \"menuItems\":coalesce(\n      menuItems[]->{_type, \"slug\": coalesce(slug.current, \"\"), title},\n      []\n    ),\n    ogImage,\n  }": SETTINGSResult;
    "count(*[\n  _type == \"post\"\n  && defined(slug.current)\n  && (isFeatured != true || defined($category))\n  && select(defined($category) => $category in categories[]->slug.current, true)\n])": TOTAL_POSTSResult;
    "*[\n  _type == \"post\"\n  && defined(slug.current)\n  && (isFeatured != true || defined($category))\n  && select(defined($category) => $category in categories[]->slug.current, true)\n]|order(publishedAt desc)[$startIndex...$endIndex]{\n  title,\n  \"slug\": slug.current,\n  publishedAt,\n  excerpt,\n  author->{\n    name,\n    image,\n  },\n  categories[]->{\n    title,\n    \"slug\": slug.current,\n  }\n}": POSTSResult;
    "*[\n  _type == \"post\"\n  && isFeatured == true\n  && defined(slug.current)\n]|order(publishedAt desc)[0...$quantity]{\n  title,\n  \"slug\": slug.current,\n  publishedAt,\n  mainImage,\n  excerpt,\n  author->{\n    name,\n    image,\n  },\n}": FEATURED_POSTSResult;
    "*[\n  _type == \"post\"\n  && defined(slug.current)\n]|order(isFeatured, publishedAt desc){\n  title,\n  \"slug\": slug.current,\n  publishedAt,\n  mainImage,\n  excerpt,\n  author->{\n    name,\n  },\n}": FEED_POSTSResult;
    "*[\n  _type == \"post\"\n  && slug.current == $slug\n][0]{\n  publishedAt,\n  title,\n  mainImage,\n  excerpt,\n  body,\n  author->{\n    name,\n    image,\n  },\n  categories[]->{\n    title,\n    \"slug\": slug.current,\n  }\n}\n": POSTResult;
    "*[\n  _type == \"category\"\n  && count(*[_type == \"post\" && defined(slug.current) && ^._id in categories[]._ref]) > 0\n]|order(title asc){\n  title,\n  \"slug\": slug.current,\n}": CATEGORIESResult;
  }
}
