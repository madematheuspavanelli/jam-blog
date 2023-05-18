"use client";

import Link from "next/link";

type Props = {
  id: string;
  title: string;
  author?: string;
};

export function ArticleItem({ id, title, author = "Desconhecido" }: Props) {
  return (
    <Link href={`/posts/${id}`}>
      <button className="block h-24 w-full cursor-pointer  border border-slate-500 p-4 text-left hover:bg-slate-800">
        <h3 className="text-lg font-semibold text-slate-100">{title}</h3>
        <p className="italic text-slate-200">por {author}</p>
      </button>
    </Link>
  );
}
