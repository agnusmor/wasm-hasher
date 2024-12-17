const { run_hasher } = require('./pkg/wasm_hasher.js');
const fs = require('node:fs');

async function run() {
    try {
        const fileBuffer = fs.readFileSync('../build/input.bin'); 
        let output = run_hasher(fileBuffer);
        
        const dataView = new DataView(output.buffer);

        for (let i = 0; i < output.length; i += 4) {
            // Read the next 4 bytes as a 32-bit unsigned integer
            const value = dataView.getUint32(i, false); // true for little-endian byte order, false for big-endian

            // Print the value as a hexadecimal number
            console.log(`public ${i / 4}: 0x${value.toString(16).padStart(8, "0")}`);
        }           
    }
    catch (error) {
        console.error('Error running wasm hasher:', error);
    }
}

run();