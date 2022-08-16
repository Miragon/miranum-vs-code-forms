import {createVuePlugin} from "vite-plugin-vue2";

export default {
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
    }
}
