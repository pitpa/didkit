#!/bin/bash

docker run -v $PWD/..:/app -it --rm rust:1.81.0 bash -c "cargo install wasm-pack && cd app/didkit/lib/web && wasm-pack build --out-dir /app/didkit/didkit-wasm-node --target nodejs"
docker run -v $PWD/..:/app -it --rm rust:1.81.0 bash -c "cargo install wasm-pack && cd app/didkit/lib/web && wasm-pack build --out-dir /app/didkit/didkit-wasm"
