import * as wasm from "./didkit_wasm_bg.wasm";
export * from "./didkit_wasm_bg.js";
import { __wbg_set_wasm } from "./didkit_wasm_bg.js";
__wbg_set_wasm(wasm);