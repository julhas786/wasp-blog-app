import { HttpError } from 'wasp/server'

export const getPost = async ({ id }, context) => {
  if (!context.user) { throw new HttpError(401) }

  const post = await context.entities.Post.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      content: true,
      isPublished: true,
      authorId: true
    }
  });

  if (!post) throw new HttpError(404, 'No post with id ' + id);

  return post;
}

export const getPosts = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };
  return context.entities.Post.findMany({ where: { isPublished: true } });
}

export const getUserPosts = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  return context.entities.Post.findMany({
    where: { authorId: context.user.id }
  });
}