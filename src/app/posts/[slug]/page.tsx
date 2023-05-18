import { client } from "@/libs/apollo";
import { gql } from "@apollo/client";

type Props = {
  params: { slug: string };
};

export async function generateStaticParams() {
  const response = await client.query({
    query: gql`
      query NewQuery {
        posts {
          nodes {
            id
            title
            slug
          }
        }
      }
    `,
  });

  const posts = response.data.posts.nodes;

  return posts.map((post: { slug: string }) => ({
    slug: post.slug,
  }));
}

export default async function Posts({ params }: Props) {
  const postInfo = await client.query({
    query: gql`
      query NewQuery {
        postBy(slug: "${params.slug}") {
          id
          content
          title
          date
        }
      }
    `,
  });

  const { title, content, date } = postInfo.data.postBy;

  return (
    <div className="mx-auto h-screen max-w-2xl px-5 py-10">
      <header className="text-white mb-8">
        <h2 className="text-4xl">
          {title} <small>por {date}</small>
        </h2>
      </header>

      <div
        className="prose text-white text-justify"
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>
    </div>
  );
}
