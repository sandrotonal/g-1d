---
title: "Why Every Developer Should Build Their Own SEO Infrastructure"
date: "2026-01-15"
author: "Ömer Özbay"
excerpt: "A technical yet friendly SEO journey: from connecting Google Search Console to fixing sitemap errors and understanding meta tag importance in Next.js projects."
coverImage: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&q=80"
tags: ["SEO", "Next.js", "Web Development", "Developer", "Google Search Console"]
category: "TECHNICAL"
---

# Why Every Developer Should Build Their Own SEO Infrastructure

Today I want to share an experience I recently had while working on my portfolio site's SEO. If you're a developer and your site isn't showing up in search results, this article is for you.

## How to Connect Your Site to Google Search Console

First, head over to Google Search Console. When creating a property, you have two options:

1. **Domain DNS Verification** - Covers all subdomains
2. **URL Prefix Verification** - Verifies only a specific URL

```html
<!-- HTML Meta Tag verification -->
<meta name="google-site-verification" content="VERIFICATION_CODE" />
```

Add this meta tag to the `<head>` section of your `layout.tsx` file. Google will verify your site within a few minutes.

## The Sitemap Catastrophe: example.com Error

Here's where things get interesting. When you start a Next.js project, the default `src/app/robots.ts` and `src/app/sitemap.ts` files are created. These files usually look like this:

```typescript
// robots.ts
export default function robots(): MetadataRoute.Robots {
  return {
    sitemap: 'https://example.com/sitemap.xml', // ❌ Error!
  };
}

// sitemap.ts
const baseUrl = 'https://example.com'; // ❌ Error!
```

If you don't replace these `example.com` values with your own domain, Google will index your site incorrectly. When I noticed this, I made the following fix:

```typescript
// robots.ts - Fixed version
export default function robots(): MetadataRoute.Robts {
  return {
    sitemap: 'https://gucluyumhe.dev/sitemap.xml',
  };
}

// sitemap.ts - Fixed version
const baseUrl = 'https://gucluyumhe.dev';
```

## The Importance of Meta Tags in Next.js Projects

Meta tags are one of the foundations of SEO. The Metadata API that came with Next.js 13+ makes this job much easier:

```tsx
export const metadata: Metadata = {
  title: {
    default: "Ömer Özbay | Full-Stack Engineer",
    template: "%s | Ömer Özbay"
  },
  description: "Computer Engineering student building AI-powered SaaS applications...",
  keywords: [
    "Ömer Özbay",
    "Full-Stack Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript"
  ],
  authors: [{ name: "Ömer Özbay", url: "https://gucluyumhe.dev" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://gucluyumhe.dev",
    siteName: "Ömer Özbay Portfolio",
    images: [{
      url: "https://gucluyumhe.dev/og-image.png",
      width: 1200,
      height: 630,
    }],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@gucluyumhe",
  },
  robots: {
    index: true,
    follow: true,
  },
};
```

### Why Are Keywords and Open Graph Important?

- **Keywords**: Tells search engines about your site's content
- **Open Graph**: Makes it look good when shared on social media
- **Twitter Card**: Shows full image and description when shared on X

## Accessibility: ARIA Labels

Another important point is accessibility. We must provide descriptive names for all links and buttons for screen readers:

```tsx
// ❌ Bad example
<Link href="/projects">Projects</Link>

// ✅ Good example
<Link href="/projects" aria-label="View my projects">Projects</Link>

// ❌ Mobile menu button
<button onClick={toggleMenu}>☰</button>

// ✅ Mobile menu button
<button 
  onClick={toggleMenu}
  aria-label={isOpen ? "Close menu" : "Open menu"}
  aria-expanded={isOpen}
>☰</button>
```

## PWA Support: site.webmanifest

If you want to give mobile users the "Add to home screen" feature, a manifest file is essential:

```json
{
  "name": "Ömer Özbay Portfolio",
  "short_name": "Ömer Özbay",
  "description": "Full-Stack Engineer Portfolio",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0e0e0f",
  "theme_color": "#00E5FF",
  "icons": [{
    "src": "/favicon.svg",
    "sizes": "any",
    "type": "image/svg+xml"
  }]
}
```

## Conclusion

SEO may seem like a technical topic, but it's actually made up of quite understandable and logical steps. The important things are:

1. **Add verification code** - First contact with Google
2. **Fix the sitemap** - Let Google discover your site
3. **Optimize meta tags** - Get attention in search results
4. **Ensure accessibility** - Make it usable for everyone
5. **PWA support** - Improve mobile experience

Remember: Even if you have a great product, if no one can find you, it doesn't mean anything. SEO is the key to your door in the digital world.

See you in the next article! 
