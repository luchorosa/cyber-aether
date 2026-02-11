import rss, { type RSSFeedItem } from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { marked } from 'marked';

export async function GET(context: APIContext) {
  const posts = await getCollection("posts", ({ data }) => !data.draft);
  const photos = await getCollection("photolog", ({ data }) => !data.draft);

  const items: RSSFeedItem[] = await Promise.all(
    [
      ...posts.map((post) => ({ type: "posts" as const, post })),
      ...photos.map((post) => ({ type: "photolog" as const, post })),
    ]
      .sort((a, b) => b.post.data.date.valueOf() - a.post.data.date.valueOf())
      .map(async ({ type, post }): Promise<RSSFeedItem> => ({
        title: post.data.title,
        pubDate: post.data.date,
        link: type === "posts" ? `/blog/${post.slug}/` : `/photolog/${post.slug}/`,
        content: await marked(post.body),
      }))
  );

  return rss({
    title: "Cyber Aether",
    description: "A blog about nothing",
    site: context.site ?? 'https://cyberaether.xyz',
    items,
  });
}
