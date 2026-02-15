import { defineCollection, z } from "astro:content";


const platos = defineCollection({
  schema: z.object({
    title: z.string(),
    type: z.string(),
    lang : z.string(),
    price: z.number(),
    img: z.string()
  })
})

export const collections = {platos}