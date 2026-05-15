
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://calculator.camly.org';
  
  // Active high-authority masterclasses and whitepapers
  const blogPosts = [
    'neuro-cognitive-flow-synchronization-masterclass',
    'digital-infrastructure-velocity-protocol',
    'chronological-sovereignty-enterprise-whitepaper',
    'deep-work-velocity-masterclass',
    'digital-asset-velocity-enterprise-guide',
    'global-time-synchronization-standards',
    'image-and-pdf-resizing-optimization',
    'ai-revolution-personal-utilities',
    'zodiac-symbols-history-of-time'
  ];

  const routes = [
    '', // Root Pomodoro Engine
    '/notes',
    '/blog',
    '/privacy-protocol',
    '/terms-of-sync',
    '/security-ops'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const blogRoutes = blogPosts.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...routes, ...blogRoutes];
}
