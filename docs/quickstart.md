## Download from Marketplace
1. Visit the official vscode [marketplace](https://marketplace.visualstudio.com/items?itemName=miragon-gmbh.vs-code-vuetify-jsonschema-builder)
2. Click on `Install`

## Manual Installation
### First Option
1. Download the VSIX file from the latest [release](https://github.com/FlowSquad/vs-code-vuetify-jsonschema-builder/releases)
2. Install the extension manually
    ```shell
    code --install-extension vs-code-vuetify-jsonschema-builder-0.1.0.vsix
    ```
3. Start VSCode and open a .form file

### Second Option
1. Clone the repo
    ```shell
    git clone https://github.com/FlowSquad/vs-code-vuetify-jsonschema-builder.git
    ```
2. Install dependencies
    ```shell
    cd vs-code-vuetify-jsonschema-builder
    npm install
    ```
3. Build Extension
    ```shell
    npm run build
    ```
4. Open the project in VSCode
    ```shell
    code .
    ```
In VSCode you can start the `Extension Host` by pressing `F5`. This will open a second VSCode-Window.
Now you can open the example by navigating to `/src/test/example/Test.form` within the new window.
