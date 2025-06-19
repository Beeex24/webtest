import { defineCollection, z } from 'astro:content';

const devices = defineCollection({
    schema: z.object({
        id: z.string(),
        name: z.string(),
        description: z.string(),
        image: z.string(),
    }),
});

export const collections = {
    devices,
};