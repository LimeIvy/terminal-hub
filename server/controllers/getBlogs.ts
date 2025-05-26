//controllers/getBlogs.ts
export const getBlogsHandler: RouteHandler<typeof getBlogsRoute> = async (
  c
) => {
  const blogs = await prisma.blog.findMany({
    include: {
      user: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });

  return c.json(blogs, 200);
};
