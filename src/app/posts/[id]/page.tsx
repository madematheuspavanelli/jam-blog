import { client } from "@/libs/apollo";
import { gql } from "@apollo/client";

type Props = {
  params: { id: string };
};

export async function generateStaticParams() {
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

  const posts = response.data.posts.nodes;

  return posts.map((post: { id: string }) => ({
    id: post.id,
  }));
}

export default async function Posts({ params }: Props) {
  const postInfo = await client.query({
    query: gql`
      query NewQuery {
        post(id: "${params.id}") {
          id
          title
          content
          author {
            node {
              name
            }
          }
        }
      }
    `,
  });

  const { title, content, author } = postInfo.data.post;
  const authorName = author.node.name;

  return (
    <div className="text-white">
      <h2 className="text-4xl">
        {title} por <small>{authorName}</small>
      </h2>

      <div className="prose">{content}</div>
    </div>
  );
}
