import ogs from "open-graph-scraper";

export const isRelativeUrl = (url: string) => {
  return !url.startsWith("http");
};

export async function scrapLinkInfo(url: string) {
  // fetch link info
  const { result, error } = await ogs({
    url,
  });

  if (error) {
    return {
      error: "Failed to scrape link info. Please check the URL and try again.",
    };
  }

  const title = result.ogTitle || result.twitterTitle || new URL(url).origin;

  let description = "";
  let image = null;
  let favicon = null;

  if (result.ogDescription) {
    description = result.ogDescription;
  } else if (result.twitterDescription) {
    description = result.twitterDescription;
  }

  if (result.ogImage) {
    image = result.ogImage[0].url;
  } else if (result.twitterImage) {
    image = result.twitterImage[0].url;
  }

  if (result.favicon) {
    favicon = isRelativeUrl(result.favicon)
      ? new URL(result.favicon, url).href
      : result.favicon;
  } else {
    favicon = `https://www.google.com/s2/favicons?sz=64&domain_url=${
      new URL(url).origin
    }`;
  }

  return {
    title,
    description,
    image,
    url: result.requestUrl,
    favicon,
  };
}

export async function downloadImage(url: string): Promise<{
  image: Promise<ArrayBuffer>;
  contentType: string | null;
}> {
  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error("Failed to download image");
    }

    const contentType = res.headers.get("content-type");

    return {
      image: res.arrayBuffer(),
      contentType,
    };
  } catch (error) {
    throw new Error("Failed to download image");
  }
}
