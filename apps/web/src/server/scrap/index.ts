import ogs from "open-graph-scraper";

export const isRelativeUrl = (url: string) => {
  return !url.startsWith("http");
};

// html에서 description meta tag의 content를 찾아 반환
export const findDescriptionFromHTML = (html: string) => {
  const match = /<meta name="description" content="(?:.*)">/.exec(html);
  if (!match) {
    return null;
  }
  return match[1];
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
  result.dcTitle;

  const title = result.ogTitle || result.twitterTitle || new URL(url).origin;

  let image = null;
  let favicon = null;

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
