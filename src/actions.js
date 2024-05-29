import { HttpError } from 'wasp/server'

export const createPost = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };
  return context.entities.Post.create({
    data: {
      title: args.title,
      content: args.content,
      isPublished: false,
      authorId: context.user.id
    }
  });
}

export const updatePost = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const post = await context.entities.Post.findUnique({
    where: { id: args.id }
  });
  if (post.authorId !== context.user.id) { throw new HttpError(403) };

  return context.entities.Post.update({
    where: { id: args.id },
    data: { title: args.title, content: args.content }
  });
}

export const deletePost = async ({ postId }, context) => {
  if (!context.user) { throw new HttpError(401) };

  const post = await context.entities.Post.findUnique({
    where: { id: postId }
  });
  if (post.authorId !== context.user.id) { throw new HttpError(403) };

  await context.entities.Post.delete({
    where: { id: postId }
  });

  return true;
}