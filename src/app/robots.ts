import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/_next/', '/api/', '/admin/'],
    },
    sitemap: 'https://pomodoro-timer.camly.org/sitemap.xml',
    host: 'https://pomodoro-timer.camly.org',
  };
}
