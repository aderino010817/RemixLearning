import { z } from 'zod';
//tempat entities


export const createPostSchema = z.object({
    title: z.string().min(1),
});

export const updatePostSchema = z.object({
    id: z.number(),
});