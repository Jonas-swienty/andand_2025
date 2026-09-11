import { defineField, defineType } from "sanity";

export default defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle / Category",
      description: "e.g. \"Workspace Design\", \"Commercial Interior\"",
      type: "string",
    }),
    defineField({
      name: "location",
      title: "Location",
      description: "e.g. \"Copenhagen, Denmark\"",
      type: "string",
    }),
    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Alt text", type: "string" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", title: "Alt text", type: "string" }],
        },
      ],
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      description: "Short summary used for SEO meta description and previews.",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "story",
      title: "Project story",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "order",
      title: "Display order",
      description: "Lower numbers show first on the projects page.",
      type: "number",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "subtitle", media: "coverImage" },
  },
});
