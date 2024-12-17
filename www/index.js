async function run() {
    try {
        const myWorker = new Worker(new URL('./worker.js', import.meta.url));

        // Add an event listener to the file picker input element
        document.getElementById("file_picker").addEventListener(
            "change",
            async function() {
                console.log("File picker change event");
                let file = this.files[0];
                
                if (!file) {
                    console.warn("No file selected");
                    return;
                } else {
                    console.log("File selected: " + file.name);
                }

                const buffer = await readFileAsArrayBuffer(file);

                // Send message to the worker to execute wasm hasher using file as input
                myWorker.postMessage({ buffer: buffer });
                
                // Process the message response from the worker
                myWorker.onmessage = function(e) {
                    const outputDiv = document.getElementById('output');
                    const dataView = new DataView(e.data.buffer);

                    for (let i = 0; i < e.data.length; i += 4) {
                        // Read the next 4 bytes as a 32-bit unsigned integer
                        const value = dataView.getUint32(i, false); // true for little-endian byte order, false for big-endian

                        // Create a log message showing the value as a hexadecimal number
                        const logMsg = `public ${i / 4}: 0x${value.toString(16).padStart(8, "0")}`;

                        // Print the logMsg in the output div
                        const outputLine = document.createTextNode(logMsg);
                        outputDiv.appendChild(outputLine);
                        outputDiv.appendChild(document.createElement('br'));                        

                        // Print the logMsg in the console
                        console.log(logMsg);
                    }                    
                };
            },
            false
        );
    } catch (error) {
        console.error("Error running wasm hasher: ", error);
    }
}

// Helper function to read the file as an ArrayBuffer using a Promise
function readFileAsArrayBuffer(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(new Error('Failed to read file as ArrayBuffer'));

        reader.readAsArrayBuffer(file);
    });
}

run();
