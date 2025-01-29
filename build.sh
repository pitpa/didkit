# docker run -v $PWD:/didkit -it --rm rust bash -c "cargo install wasm-pack && git clone https://github.com/pitpa/ssi --recurse-submodules && cd didkit/lib/web && wasm-pack build --out-dir /didkit/didkit-wasm-node --target nodejs"
# docker run -v $PWD:/didkit -it --rm rust bash -c "cargo install wasm-pack && git clone https://github.com/pitpa/ssi --recurse-submodules && cd didkit/lib/web && wasm-pack build --out-dir /didkit/didkit-wasm"

docker run -v $PWD/..:/work -it --rm rust bash -c "cargo install wasm-pack && cd work/didkit/lib/web && wasm-pack build --out-dir /work/didkit/didkit-wasm-node --target nodejs"
docker run -v $PWD/..:/work -it --rm rust bash -c "cargo install wasm-pack && cd work/didkit/lib/web && wasm-pack build --out-dir /work/didkit/didkit-wasm"

# docker run -v $PWD:/didkit -it --rm rust:1.71 bash -c "\
#   cargo install wasm-pack --version 0.12.1 --locked && \
#   git clone https://github.com/dou-id/ssi --recurse-submodules && \
#   cd ssi && \
#   git checkout stable && \
#   cd ../didkit/lib/web && \
#   cargo update -p bumpalo --precise 3.14.0 && \
#   wasm-pack build --out-dir /didkit/didkit-wasm-node --target nodejs"

# docker run -v $PWD:/didkit -it --rm rust:1.71 bash -c "\
#   cargo install wasm-pack --version 0.12.1 --locked && \
#   git clone https://github.com/dou-id/ssi --recurse-submodules && \
#   cd ssi && \
#   git checkout stable && \
#   cd ../didkit/lib/web && \
#   cd didkit/lib/web && \
#   cargo update -p bumpalo --precise 3.14.0 && \
#   wasm-pack build --out-dir /didkit/didkit-wasm"
