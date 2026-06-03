import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const { url } = await request.json();
    if (!url) {
      return new Response(JSON.stringify({ error: 'URL is required' }), { status: 400 });
    }

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    const html = await response.text();
    const urlObj = new URL(url);

    // Basic regex-based extraction (can be improved with a proper parser)
    const titleMatch = html.match(/<title>(.*?)<\/title>/i);
    const descriptionMatch = html.match(/<meta name="description" content="(.*?)"/i) || 
                         html.match(/<meta property="og:description" content="(.*?)"/i) ||
                         html.match(/<meta name="twitter:description" content="(.*?)"/i);
    
    // Better favicon detection
    const faviconPatterns = [
      /<link.*?rel="icon".*?href="(.*?)"/i,
      /<link.*?rel="shortcut icon".*?href="(.*?)"/i,
      /<link.*?rel="apple-touch-icon".*?href="(.*?)"/i
    ];
    
    let favicon = '';
    for (const pattern of faviconPatterns) {
      const match = html.match(pattern);
      if (match) {
        favicon = match[1];
        break;
      }
    }

    if (favicon && !favicon.startsWith('http')) {
      if (favicon.startsWith('//')) {
        favicon = `${urlObj.protocol}${favicon}`;
      } else if (favicon.startsWith('/')) {
        favicon = `${urlObj.origin}${favicon}`;
      } else {
        favicon = `${urlObj.origin}/${favicon}`;
      }
    }

    return new Response(JSON.stringify({
      title: (titleMatch ? titleMatch[1] : '').replace(/&amp;/g, '&'),
      description: (descriptionMatch ? descriptionMatch[1] : '').replace(/&amp;/g, '&'),
      favicon_url: favicon || `https://www.google.com/s2/favicons?domain=${urlObj.hostname}&sz=128`
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch metadata' }), { status: 500 });
  }
};
