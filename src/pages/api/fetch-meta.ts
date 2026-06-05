import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const { url } = await request.json();
    if (!url) {
      return new Response(JSON.stringify({ error: 'URL is required' }), { status: 400 });
    }

    // Bug 10: Validate URL to prevent SSRF
    let parsedUrl: URL;
    try {
      parsedUrl = new URL(url);
    } catch {
      return new Response(JSON.stringify({ error: 'Invalid URL' }), { status: 400 });
    }

    // Only allow http/https protocols
    if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
      return new Response(JSON.stringify({ error: 'Only HTTP/HTTPS URLs are allowed' }), { status: 400 });
    }

    // Block private/internal IP ranges
    const hostname = parsedUrl.hostname;
    const blockedPatterns = [
      /^localhost$/i,
      /^127\./,
      /^10\./,
      /^172\.(1[6-9]|2\d|3[01])\./,
      /^192\.168\./,
      /^0\./,
      /^169\.254\./,
      /^\[::1\]$/,
      /^\[fc/i,
      /^\[fd/i,
      /^\[fe80/i,
    ];

    if (blockedPatterns.some(pattern => pattern.test(hostname))) {
      return new Response(JSON.stringify({ error: 'Internal URLs are not allowed' }), { status: 400 });
    }

    // Add timeout via AbortController
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      },
      signal: controller.signal
    });
    clearTimeout(timeout);

    const html = await response.text();

    // Bug 11: Improved regex patterns
    // Use dotAll flag (s) so . matches newlines in title
    const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    
    // Order-independent meta tag matching for description
    const descriptionMatch = 
      html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([\s\S]*?)["'][^>]*\/?>/i) ||
      html.match(/<meta[^>]*content=["']([\s\S]*?)["'][^>]*name=["']description["'][^>]*\/?>/i) ||
      html.match(/<meta[^>]*property=["']og:description["'][^>]*content=["']([\s\S]*?)["'][^>]*\/?>/i) ||
      html.match(/<meta[^>]*content=["']([\s\S]*?)["'][^>]*property=["']og:description["'][^>]*\/?>/i) ||
      html.match(/<meta[^>]*name=["']twitter:description["'][^>]*content=["']([\s\S]*?)["'][^>]*\/?>/i);
    
    // Better favicon detection with order-independent attributes
    const faviconPatterns = [
      /<link[^>]*rel=["']icon["'][^>]*href=["'](.*?)["'][^>]*\/?>/i,
      /<link[^>]*href=["'](.*?)["'][^>]*rel=["']icon["'][^>]*\/?>/i,
      /<link[^>]*rel=["']shortcut icon["'][^>]*href=["'](.*?)["'][^>]*\/?>/i,
      /<link[^>]*href=["'](.*?)["'][^>]*rel=["']shortcut icon["'][^>]*\/?>/i,
      /<link[^>]*rel=["']apple-touch-icon["'][^>]*href=["'](.*?)["'][^>]*\/?>/i,
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
        favicon = `${parsedUrl.protocol}${favicon}`;
      } else if (favicon.startsWith('/')) {
        favicon = `${parsedUrl.origin}${favicon}`;
      } else {
        favicon = `${parsedUrl.origin}/${favicon}`;
      }
    }

    // Decode common HTML entities
    function decodeEntities(str: string): string {
      return str
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&#x27;/g, "'")
        .replace(/&#x2F;/g, '/')
        .trim();
    }

    return new Response(JSON.stringify({
      title: decodeEntities(titleMatch ? titleMatch[1] : ''),
      description: decodeEntities(descriptionMatch ? descriptionMatch[1] : ''),
      favicon_url: favicon || `https://www.google.com/s2/favicons?domain=${parsedUrl.hostname}&sz=128`
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    const message = error instanceof Error && error.name === 'AbortError' 
      ? 'Request timed out' 
      : 'Failed to fetch metadata';
    return new Response(JSON.stringify({ error: message }), { status: 500 });
  }
};
