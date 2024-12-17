#!/bin/bash

docker run -v $PWD:/didkit -v ~/workspace/sakazuki_ex/ssi:/ssi -it --rm rust:1.81.0 bash -c "cargo install wasm-pack && cd didkit/lib/web && wasm-pack build --out-dir /didkit/didkit-wasm-node --target nodejs"
docker run -v $PWD:/didkit -v ~/workspace/sakazuki_ex/ssi:/ssi -it --rm rust:1.81.0 bash -c "cargo install wasm-pack && cd didkit/lib/web && wasm-pack build --out-dir /didkit/didkit-wasm"
