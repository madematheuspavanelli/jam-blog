import { gql } from "@apollo/client";
import { client } from "@/libs/apollo";
import { ArticleItem } from "@/components/ArticleItem";

type Post = {
  id: string;
  title: string;
};

export default async function Home() {
  async function getPosts() {
    const response = await client.query({
      query: gql`
        query NewQuery {
          posts {
            nodes {
              id
              title
            }
          }
        }
      `,
    });

    return response.data.posts.nodes;
  }

  const posts = await getPosts();

  return (
    <div className="mx-auto h-screen max-w-2xl px-5 py-10">
      <h1 className="mb-10 text-4xl text-white">Posts</h1>

      <div className="space-y-4">
        {posts.map((post: Post) => {
          const { id, title } = post;
          return <ArticleItem key={id} id={id} title={title} />;
        })}
      </div>
    </div>
  );
}
