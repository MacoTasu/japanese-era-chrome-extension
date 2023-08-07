import { defineConfig } from 'vite'
import { crx, defineManifest } from '@crxjs/vite-plugin'

const manifest = defineManifest({
    manifest_version: 3,
    name: '令和から西暦へ',
    description: '記事中の元号を西暦に変化します',
    version: '1.0',
    icons: {
        '16': 'images/icon-16.png',
        '32': 'images/icon-32.png',
        '48': 'images/icon-48.png',
        '128': 'images/icon-128.png',
    },
    content_scripts: [
        {
            js: ['scripts/content.ts'],
            matches: [
                'http://*/*',
                'https://*/*'
            ]
        }
    ],
})

export default defineConfig({
    plugins: [crx({ manifest })],
})
