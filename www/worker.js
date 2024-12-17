import * as wasm from "wasm-hasher";

self.onmessage = async function(e) {
    if (e.data && e.data.buffer) {
        console.log("Buffer received in worker, length: " + e.data.buffer.byteLength);
        const uint8Array = new Uint8Array(e.data.buffer);
        let result = wasm.run_hasher(uint8Array);
        postMessage(result);
    } else {
        console.error("No buffer received in worker");
    }
};
