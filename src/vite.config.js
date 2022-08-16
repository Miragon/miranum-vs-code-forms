import {createVuePlugin} from "vite-plugin-vue2";

import { defineConfig } from 'vite'

export default defineConfig({
     plugins : [
        createVuePlugin()
    ],
    build: {
        target: 'esnext',
        lib: {
            entry: 'src/main.ts',
            name: 'test',
            fileName: 'client',
        },
        outDir: 'dist/client'
    },
    define: {
        "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    }
})

