// "use client";

import { gql } from "@apollo/client";
import { client } from "@/libs/apollo";

export default async function Home() {
  async function getPosts() {
    const response = await client.query({
      query: gql`
        query NewQuery {
          posts {
            edges {
              node {
                id
                title
              }
            }
          }
        }
      `,
    });

    return response.data.posts.edges;
  }

  const posts = await getPosts();

  return (
    <div className="max-w-lg mx-auto py-6 px-5">
      <h1 className="text-2xl mb-10">Posts</h1>

      <div className="space-y-4">
        {posts.map((post) => {
          const { id, title } = post.node;
          return (
            <button
              key={id}
              className="p-4 rounded shadow hover:bg-slate-700 bg-slate-900 cursor-pointer"
            >
              {title}
            </button>
          );
        })}
      </div>
    </div>
  );
}
