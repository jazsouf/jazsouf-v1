import { defineQuery } from "next-sanity";

export const HOME_PAGE = defineQuery(`*[
  _type == "home" && defined(_id)
][0]{
    _id,
    title,
    overview,
    "showcaseProjects": coalesce(showcaseProjects[]->{
      _type,
      title,
      "slug": coalesce(slug.current, ""),
      coverImage,
      overview,
      services,
      tags,
      year
    },[]),
    services,
    stack,
  }`);

export const HOME_PAGE_TITLE = defineQuery(`*[_type == "home"][0]{
  title
}`);

export const PAGE_BY_SLUG = defineQuery(`*[
  _type == "page" && slug.current == $slug && defined(_id)
][0]{
    _id,
    body,
    overview,
    title,
    "slug": coalesce(slug.current, ""),
  }`);

export const PROJECT_BY_SLUG = defineQuery(`*[
  _type == "project" && slug.current == $slug && defined(_id)
][0]{
    _id,
    title,
    "slug": coalesce(slug.current, ""),
    overview,
    coverImage,
    extraImages,
    client,
    site,
    services,
    tags,
    description,
    duration,
    year
  }`);

export const ART_BY_SLUG = defineQuery(`*[
  _type == "art" && slug.current == $slug
][0]{
  _id,
  "slug": coalesce(slug.current, ""),
  image,
  overview,
  title,
  }`);

export const PROJECT_SLUGS = defineQuery(`*[
  _type == "project" && defined(slug.current)
]{
  "slug": coalesce(slug.current, "")
}`);

export const ART_SLUGS = defineQuery(`*[
  _type == "art" && defined(slug.current)
]{
  "slug": coalesce(slug.current, "")
}`);

export const PAGE_SLUGS = defineQuery(`*[
  _type == "page" && defined(slug.current)
]{
  "slug": coalesce(slug.current, "")
}`);

export const SETTINGS = defineQuery(`*[
  _type == "settings"
][0]{
    footer,
    "menuItems":coalesce(
      menuItems[]->{_type, "slug": coalesce(slug.current, ""), title},
      []
    ),
    ogImage,
  }`);

export const TOTAL_POSTS = defineQuery(/* groq */ `count(*[
  _type == "post"
  && defined(slug.current)
  && (isFeatured != true || defined($category))
  && select(defined($category) => $category in categories[]->slug.current, true)
])`);

export const POSTS = defineQuery(/* groq */ `*[
  _type == "post"
  && defined(slug.current)
  && (isFeatured != true || defined($category))
  && select(defined($category) => $category in categories[]->slug.current, true)
]|order(publishedAt desc)[$startIndex...$endIndex]{
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  author->{
    name,
    image,
  },
  categories[]->{
    title,
    "slug": slug.current,
  }
}`);

export const FEATURED_POSTS = defineQuery(/* groq */ `*[
  _type == "post"
  && isFeatured == true
  && defined(slug.current)
]|order(publishedAt desc)[0...$quantity]{
  title,
  "slug": slug.current,
  publishedAt,
  mainImage,
  excerpt,
  author->{
    name,
    image,
  },
}`);

export const FEED_POSTS = defineQuery(/* groq */ `*[
  _type == "post"
  && defined(slug.current)
]|order(isFeatured, publishedAt desc){
  title,
  "slug": slug.current,
  publishedAt,
  mainImage,
  excerpt,
  author->{
    name,
  },
}`);

export const POST = defineQuery(/* groq */ `*[
  _type == "post"
  && slug.current == $slug
][0]{
  publishedAt,
  title,
  mainImage,
  excerpt,
  body,
  author->{
    name,
    image,
  },
  categories[]->{
    title,
    "slug": slug.current,
  }
}
`);

export const CATEGORIES = defineQuery(/* groq */ `*[
  _type == "category"
  && count(*[_type == "post" && defined(slug.current) && ^._id in categories[]._ref]) > 0
]|order(title asc){
  title,
  "slug": slug.current,
}`);
