import { defineQuery } from "next-sanity";

export const HOME_PAGE = defineQuery(`*[
  _type == "home" && defined(_id)
][0]{
    _id,
    overview,
    "showcaseProjects": coalesce(showcaseProjects[]->{
      _type,
      coverImage,
      overview,
      "slug": coalesce(slug.current, ""),
      tags,
      title,
    },[]
    ),
    title,
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
    client,
    coverImage,
    description,
    duration,
    overview,
    site,
    "slug": coalesce(slug.current, ""),
    tags,
    title,
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

export const SETTINGS_QUERY = defineQuery(`*[
  _type == "settings"
][0]{
    footer,
    "menuItems":coalesce(
      menuItems[]->{_type, "slug": coalesce(slug.current, ""), title},
      []
    ),
    ogImage,
  }`);
