const connectBluetoothDevice = async () => {
  try {
    // Check if the Web Bluetooth API is available
    if (!navigator.bluetooth) {
      throw new Error("Web Bluetooth API is not available in this browser/environment");
    }

    console.log("Requesting device", navigator.bluetooth);

    const device = await navigator.bluetooth.requestDevice({
      filters: [{ namePrefix: "Prefix-" }],
    });

    console.log("Device", device);

    const value = await characteristic.readValue();
  } catch (error) {
    console.error("Error:", error.message);
    document.getElementById("status").textContent = `Error: ${error.message}`;
  }
};

// Add click event listener to the button
document.getElementById("connectButton").addEventListener("click", () => {
  console.log("Connecting to Bluetooth Device");
  connectBluetoothDevice();
});

// Only run if we're in a browser environment
if (typeof window !== "undefined" && window.navigator) {
  console.log("Connecting to Bluetooth Device");
  // connectBluetoothDevice();
} else {
  console.log("Not in a browser environment");
  console.error("This code must be run in a browser environment");
}
