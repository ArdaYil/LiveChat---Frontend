import "../cssDist/index.css";
import UserForm from "./components/UserForm";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import io from "socket.io-client";

interface Message {
  sender: string;
  message: string;
  date: Date;
}

function App() {
  let stompClient = null;

  const displayMessage = (message: Message) => {
    const paragraph = document.createElement("p");
    paragraph.innerText = message.message;

    document.body.appendChild(paragraph);
  };

  const handleConnect = () => {
    const socket = io("ws://localhost:8080/chat.addUser");

    socket.on("connection", (socket) => {
      console.log("Connected");

      socket.on("message", (text: Message) => {
        displayMessage(text);
      });
    });
  };

  return (
    <>
      <UserForm onConnect={handleConnect} />
    </>
  );
}

export default App;
