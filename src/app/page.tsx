import { ArticleItem } from "@/components/ArticleItem";

type Post = {
  id: string;
  title: string;
  slug: string;
};

export default async function Home() {
  const endpoint: string = process.env.WP_API || "";

  const { data } = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
         query NewQuery {
           posts {
             nodes {
               id
               title
               slug
             }
           }
         }`,
    }),
    next: { revalidate: 2 },
  }).then((res) => res.json());

  const posts = data.posts.nodes;

  return (
    <div className="mx-auto h-screen max-w-2xl px-5 py-10">
      <h1 className="mb-10 text-4xl text-white">Posts</h1>

      <div className="flex flex-col gap-4">
        {posts.map((post: Post) => {
          const { id, title, slug } = post;
          return <ArticleItem key={id} id={slug} title={title} />;
        })}
      </div>
    </div>
  );
}
