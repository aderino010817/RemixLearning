/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaClient } from "@prisma/client";



const prisma = new PrismaClient();

export async function getPosts() {
    return await prisma.post.findMany();
}

export async function createPost(data: any) {
    return await prisma.post.create({
        data,
    })
}

export async function deletePost(id: number) {
    return await prisma.post.delete({
        where: {
            id,
        }
    })
}

export async function updatePost(data: any) {
    return await prisma.post.update({
        data,
        where: {
            id: data.id
        }
    });
}

export async function unique(id: any) {
    return await prisma.post.findUnique({
        where: {
            id: id,
        }
    });
}