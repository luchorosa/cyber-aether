import { defineCollection, z } from "astro:content";

const postsCollection  = defineCollection({
    schema: z.object({
        author: z.string(),
        date: z.coerce.date(),
        title: z.string(),
        draft: z.boolean().default(false)
    })
})

const photosCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    location: z.string().optional(),
    camera: z.string().optional(),
    filmStock: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
    posts: postsCollection,
    photolog: photosCollection,
};
