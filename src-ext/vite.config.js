export default {
    plugins : [
    ],
    build: {
        target: 'esnext',
        lib: {
            entry: 'src-ext/extension.ts',
            name: 'extension',
            fileName: 'extension',
        },
        outDir: 'dist/extension',
        rollupOptions : {
            external: [
                'vscode'
            ]
        }
    }
}
