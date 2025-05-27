import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Taskemon',
    short_name: 'Taskemon',
    description: 'Gerencie suas tarefas com diversão estilo Pokémon!',
    start_url: '/',
    scope: '/',
    id: '/?source=pwa',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#FAF0C6',
    theme_color: '#E39191',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}