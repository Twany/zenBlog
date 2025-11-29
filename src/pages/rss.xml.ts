import rss from "@astrojs/rss";
import { getSlugFromId, withBase } from "../utils/helpers";
import { getCollection } from "astro:content";
import getSiteConfig from "../site.config";
import { defaultLang } from "../i18n/config";
import { localizePath } from "../i18n/utils";

export async function GET(context) {
  const siteConfig = getSiteConfig();
  const blog = await getCollection("blogs", (post) => post.data.lang === defaultLang);
  return rss({
    title: siteConfig.title,
    description: siteConfig.description,
    site: context.site + withBase("/"),
    trailingSlash: false,
    items: blog.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      // Compute RSS link from post `id`
      // This example assumes all posts are rendered as `/blog/[id]` routes
      link: withBase(localizePath(`/blog/${post.slug ?? getSlugFromId(post.id)}/`, defaultLang)),
    })),
    customData: `<language>en-US</language>`,
    stylesheet: withBase("/pretty-feed-v3.xsl"),
  });
}
