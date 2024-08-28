(function() {
    const app = document.querySelector(".app");
    const socket = io();

    let username;

    
    document.getElementById("join-user").addEventListener("click", function() {
        username = document.getElementById("username").value;
        if (!username) {
            alert("Please enter a username.");
            return;
        }

        socket.emit("newuser", username);
        document.querySelector(".join-screen").classList.remove("active");
        document.querySelector(".chat-screen").classList.add("active");
    });

    
    document.getElementById("send-message").addEventListener("click", function() {
        let message = document.getElementById("message-input").value;
        if (!message) return;

        displayMessage("my-message", "You", message);
        socket.emit("chat", { username: username, text: message });
        document.getElementById("message-input").value = ""; 
    });

    
    document.getElementById("exit-chat").addEventListener("click", function() {
        socket.emit("exituser", username);
        location.reload();
    });

    
    socket.on("update", function(update) {
        displayMessage("update", "", update);
    });

    
    socket.on("chat", function(message) {
        displayMessage("other-message", message.username, message.text);
    });

    
    function displayMessage(type, sender, text) {
        const messageContainer = document.querySelector(".messages");
        const messageElement = document.createElement("div");
        messageElement.classList.add("message", type);

        if (type === "update") {
            messageElement.textContent = text;
        } else {
            messageElement.innerHTML = `<div class="name">${sender}</div><div class="text">${text}</div>`;
        }

        messageContainer.appendChild(messageElement);
        messageContainer.scrollTop = messageContainer.scrollHeight; 
    }
})();
