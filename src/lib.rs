mod utils;

use std::convert::TryInto;
use sha2::{Digest, Sha256};
use utils::set_panic_hook;
use wasm_bindgen::prelude::*;
use web_sys::console;

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn add(a: i32, b: i32) -> i32 {
    a + b
}

#[wasm_bindgen]
pub fn run_hasher(input: &[u8]) -> Vec<u8> {
    set_panic_hook();

    browser_log("Running hasher".to_string());

    if input.len() == 0 {
        browser_log("input buffer is empty".to_string());
        return Vec::new();
    }

    let input: [u8; 8] = input[..8].try_into().expect("slice with incorrect length");
    let n: u64 = u64::from_le_bytes(input);    
    browser_log(format!("Input value: {}", n));

    let mut out = [0u8; 32];

    for _ in 0..n {
        let mut hasher = Sha256::new();
        hasher.update(out);
        let digest = &hasher.finalize();
        out = Into::<[u8; 32]>::into(*digest);
    }
   
    // for i in 0..8 {
    //     let val = BigEndian::read_u32(&mut out[i*4..i*4+4]);
    //     browser_log(format!("public {}: {:#010x} ", i, val));
    // }

    out.to_vec()
}

/// Logs a string to the browser's console
fn browser_log(log_msg: String) {
    console::log_1(&log_msg.into());
}

