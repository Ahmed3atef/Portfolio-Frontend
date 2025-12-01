import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa';


export default defineConfig({
    base: "/",
    plugins: [
        react(),
        VitePWA({
            registerType: "autoUpdate", // Automatically update the Service Worker
            manifest: {
                // This is your Web App Manifest (metadata for installation)
                name: "My Awesome Portfolio",
                short_name: "Portfolio",
                description: "A React/Vite portfolio showcasing my work.",
                theme_color: "#ffffff", // Primary color for the app
                icons: [
                    {
                        src: "pwa-192x192.png",
                        sizes: "192x192",
                        type: "image/png",
                    },
                    {
                        src: "pwa-512x512.png",
                        sizes: "512x512",
                        type: "image/png",
                    },
                    {
                        src: "pwa-512x512.png",
                        sizes: "512x512",
                        type: "image/png",
                        // purpose: "any maskable", // For Android adaptive icons
                    },
                ],
                screenshots: [
                    {
                        src: "screenshot-desktop.png", // Place this file in your 'public' directory
                        sizes: "1280x800", // Example size for desktop/wide (must be 1024x384 or larger)
                        type: "image/png",
                        form_factor: "wide", // Required for desktop PWA UI
                    },
                    {
                        src: "screenshot-mobile.png", // Place this file in your 'public' directory
                        sizes: "750x1334", // Example size for mobile (must be 384x384 or larger)
                        type: "image/png",
                        // form_factor: 'narrow' (or omit, as shown) - Required for mobile PWA UI
                    },
                ],
            },
            workbox: {
                // Strategy for caching API data (if the API is read-only)
                runtimeCaching: [
                    {
                        urlPattern: ({ url }) =>
                            url.origin ===
                            "https://portfolio-backend-9375.fly.dev", // e.g., 'https://api.yourdomain.com'
                        handler: "StaleWhileRevalidate", // Serve cached version while re-validating in the background
                        options: {
                            cacheName: "api-data-cache",
                            expiration: {
                                maxEntries: 10,
                                maxAgeSeconds: 60 * 60 * 24, // 24 hours
                            },
                            cacheableResponse: {
                                statuses: [0, 200],
                            },
                        },
                    },
                ],
            },
        }),
    ],
});