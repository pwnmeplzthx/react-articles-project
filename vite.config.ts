import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
    plugins: [
        // в проекте используется дефолтный экспорт, поэтому отключаем именованный exportAsDefault: true
        svgr({ exportAsDefault: true }),
        react(),
    ],
    resolve: {
        alias: [
            { find: '@', replacement: '/src' },
        ],
    },
    define: {
        __IS_DEV__: JSON.stringify(true),
        __API__: JSON.stringify('http://localhost:3000'),
        __PROJECT__: JSON.stringify('frontend'),
    },
});
