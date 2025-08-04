import rss, { type RSSFeedItem } from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { marked } from 'marked';

export async function GET(context: APIContext) {
  const posts = await getCollection("posts");

  const items: RSSFeedItem[] = await Promise.all(
    posts
      .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime())
      .map(async (post): Promise<RSSFeedItem> => ({
        title: post.data.title,
        pubDate: new Date(post.data.date),
        link: `/blog/${post.slug}/`,
        content: await marked(post.body), // transforma el markdown en HTML para el RSS
      }))
  );

  return rss({
    title: "Cyber Aether",
    description: "A blog about nothing",
    site: context.site ?? 'https://cyberaether.xyz',
    items,
  });
}
