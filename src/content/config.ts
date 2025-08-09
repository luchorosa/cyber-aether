import { defineCollection, z } from "astro:content";

const postsCollection  = defineCollection({
    schema: ({image}) => z.object({
        author: z.string(),
        date: z.coerce.date(),
        title: z.string(),
        draft: z.boolean().default(false)
    })
})

export const collections = {
    posts: postsCollection
}