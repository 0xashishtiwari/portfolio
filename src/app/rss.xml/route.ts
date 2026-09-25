import { allPosts } from "content-collections";
import { DATA } from "@/data/resume";

function escapeXml(unsafe: string) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const baseUrl = DATA.url.replace(/\/$/, "");

  const posts = [...allPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  const items = posts
    .map((post) => {
      const slug = post._meta.path.replace(/\.mdx$/, "");
      const url = `${baseUrl}/blog/${slug}`;
      const pubDate = new Date(post.publishedAt).toUTCString();
      const description = post.summary ? escapeXml(post.summary) : "";
      const title = escapeXml(post.title);

      return `    <item>
      <title>${title}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${description}</description>
      <pubDate>${pubDate}</pubDate>
      ${post.author ? `<dc:creator>${escapeXml(post.author)}</dc:creator>` : `<dc:creator>${escapeXml(DATA.name)}</dc:creator>`}
    </item>`;
    })
    .join("\n");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(DATA.name)} — Blog</title>
    <link>${baseUrl}/blog</link>
    <description>${escapeXml("Thoughts on software development, life, and more.")}</description>
    <language>en-us</language>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
