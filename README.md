# Wasm Hasher

## Requirements

- `rust` (https://www.rust-lang.org/tools/install)
- `wasm-pack` (https://rustwasm.github.io/wasm-pack/installer/)
- `nodejs` and `npm` (https://nodejs.org/en/download/package-manager)

## Build (browser)
Build wasm package (this will create `pkg` folder):
```shell
wasm-pack build
```

Install `npm` dependencies for local development server:
```shell
cd www
npm install
```

Open a new terminal to run de development server. Running the server in a new terminal lets us leave it running in the background, and doesn't block us from running other commands in the meantime. In the new terminal, run this command from the `www` folder:

```shell
npm run start
```

Navigate your Web browser to http://localhost:8080/ 

## Build (nodejs)
Build wasm package for `nodejs` (this will create `node/pkg` folder):
```shell
wasm-pack build --target nodejs --out-dir node/pkg
```

Install `npm` dependencies:
```shell
cd node
npm install
```

Run `wasm-hasher` from `node` folder:
```shell
node run-hasher.js
```
