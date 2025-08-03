import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getCollection("posts");

  const items = posts
    .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime())
    .map((post) => ({
      title: post.data.title,
      pubDate: new Date(post.data.date),
      link: `/blog/${post.slug}/`,
      content: post.body,
    }));

  return rss({
    title: "Cyber Aether",
    description: "A blog about nothing",
    site: context.site ?? 'https://cyberaether.xyz',
    items,
  });
}