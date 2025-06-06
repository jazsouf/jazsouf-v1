import { DocumentIcon, ImageIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const projectType = defineType({
  name: "project",
  title: "Project",
  type: "document",
  icon: DocumentIcon,
  fields: [
    defineField({
      name: "title",
      description: "This field is the title of your project.",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "overview",
      description: "Used both for the <meta> description tag for SEO, and project subheader.",
      title: "Overview",
      type: "array",
      of: [
        // Paragraphs
        defineArrayMember({
          lists: [],
          marks: {
            annotations: [],
            decorators: [
              {
                title: "Italic",
                value: "em",
              },
              {
                title: "Strong",
                value: "strong",
              },
            ],
          },
          styles: [],
          type: "block",
        }),
      ],
      validation: (rule) => rule.max(155).required(),
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      description:
        "This image will be used as the cover image for the project. If you choose to add it to the show case projects, this is the image displayed in the list within the homepage.",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "extraImages",
      title: "Extra Images",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          options: {
            hotspot: true,
          },
        }),
      ],
    }),
    defineField({
      name: "duration",
      title: "Duration",
      type: "duration",
      hidden: true,
      deprecated: { reason: "use the year field instead" },
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "string",
    }),
    defineField({
      name: "client",
      title: "Client",
      type: "string",
    }),
    defineField({
      name: "site",
      title: "Site",
      type: "url",
      validation: (Rule) =>
        Rule.uri({
          allowRelative: true,
          scheme: ["http", "https", "mailto", "tel"],
        }),
    }),
    defineField({
      name: "services",
      title: "Services",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    }),
    defineField({
      name: "description",
      title: "Project Description",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          marks: {
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "Url",
                    validation: (Rule) =>
                      Rule.uri({
                        allowRelative: true,
                        scheme: ["http", "https", "mailto", "tel"],
                      }),
                  },
                ],
              },
            ],
          },
          styles: [],
        }),
        defineArrayMember({
          name: "timeline",
          type: "timeline",
          deprecated: { reason: "use the year field instead" },
        }),
        defineField({
          type: "image",
          icon: ImageIcon,
          name: "image",
          title: "Image",
          options: {
            hotspot: true,
          },
          preview: {
            select: {
              imageUrl: "asset.url",
              title: "caption",
            },
          },
          fields: [
            defineField({
              title: "Caption",
              name: "caption",
              type: "string",
            }),
            defineField({
              name: "alt",
              type: "string",
              title: "Alt text",
              description: "Alternative text for screenreaders. Falls back on caption if not set",
            }),
          ],
        }),
      ],
    }),
  ],
});
