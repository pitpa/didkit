docker run -v $PWD:/didkit -it --rm rust:1.69 bash -c "\
  cargo install wasm-pack --version 0.12.1 --locked && \
  git clone https://github.com/pitpa/ssi --recurse-submodules && \
  cd didkit/lib/web && \
  cargo update -p bumpalo --precise 3.14.0 && \
  wasm-pack build --out-dir /didkit/didkit-wasm-node --target nodejs"

docker run -v $PWD:/didkit -it --rm rust:1.69 bash -c "\
  cargo install wasm-pack --version 0.12.1 --locked && \
  git clone https://github.com/pitpa/ssi --recurse-submodules && \
  cd didkit/lib/web && \
  cargo update -p bumpalo --precise 3.14.0 && \
  wasm-pack build --out-dir /didkit/didkit-wasm"
