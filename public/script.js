const socket = io("http://localhost:3000");  // Connect to WebSocket server
const modelViewer = document.querySelector("#ar-model");
const arButton = document.querySelector("#ar-button");

// Enter AR mode on button click
arButton.addEventListener("click", () => {
    if (modelViewer.canActivateAR) {
        modelViewer.enterAR();  // ✅ Correct function
    } else {
        alert("AR is not supported on this device.");
    }
});

// Listen for object updates from the server
socket.on("update-object", (position) => {
    modelViewer.setAttribute("camera-target", `${position.x}m ${position.y}m ${position.z}m`);
});

// When the user places the object, update the server
modelViewer.addEventListener("quick-look-browsing", (event) => {
    const position = { x: event.detail.x, y: event.detail.y, z: event.detail.z };
    socket.emit("place-object", position);
});
