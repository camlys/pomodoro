import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Camly | High-Precision Focus Tool',
    short_name: 'Camly',
    description: 'High-precision Pomodoro focus tool for deep work and professional productivity.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#00b4d8',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}