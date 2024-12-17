#!/bin/bash

docker run -v $PWD:/didkit -it --rm rust:1.81.0 bash -c "cargo install wasm-pack && git clone https://github.com/pitpa/ssi --recurse-submodules && cd didkit/lib/web && wasm-pack build --out-dir /didkit/didkit-wasm-node --target nodejs"
docker run -v $PWD:/didkit -it --rm rust:1.81.0 bash -c "cargo install wasm-pack && git clone https://github.com/pitpa/ssi --recurse-submodules && cd didkit/lib/web && wasm-pack build --out-dir /didkit/didkit-wasm"
