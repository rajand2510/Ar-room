 // Connect to WebSocket server
const socket = io("https://your-backend.onrender.com"); // Replace with your Render WebSocket URL
const model = document.querySelector("#ar-model");
const arButton = document.querySelector("#ar-button");

// Check if AR is supported and enable button
arButton.addEventListener("click", () => {
    if (model.canActivateAR) {
        model.activateAR();
    } else {
        alert("AR is not supported on this device.");
    }
});

// Listen for object updates from the server
socket.on("update-object", (position) => {
    model.style.transform = `translate3d(${position.x}px, ${position.y}px, ${position.z}px)`;
});

// When the user places the model in AR, update the server
model.addEventListener("ar-placement", (event) => {
    const position = {
        x: event.detail.x,
        y: event.detail.y,
        z: event.detail.z
    };
    socket.emit("place-object", position);
});
