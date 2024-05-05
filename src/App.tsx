import { useEffect, useState } from "react";
import "../cssDist/index.css";
import UserForm from "./components/UserForm";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import useWebSocket from "react-use-websocket";

interface Message {
  sender: string;
  message: string;
  date: Date;
}

function App() {
  const [username, setUsername] = useState("username");
  // const { sendJsonMessage } = useWebSocket("ws://127.0.0.1:8080/chat.addUser", {
  //   queryParams: { username },
  // });

  // sendJsonMessage("test");

  useEffect(() => {
    const ws = new WebSocket("ws://127.0.0.1:8080");

    ws.onopen = () => {
      console.log("Connect");
    };
  });

  let stompClient: Stomp.Client | null = null;

  const onMessageReceived = () => {};

  const onConnect = () => {
    if (!stompClient) return;

    // stompClient.subscribe("/topic/public", onMessageReceived);
    // stompClient.send(
    //   "/app/chat.adduser",
    //   {},
    //   JSON.stringify({ sender: username, type: "JOIN" })
    // );
  };

  const onError = () => {};

  const handleConnect = (username: string) => {
    setUsername(username);

    // const socket = new WebSocket("ws://127.0.0.1:8080");
    // stompClient = Stomp.over(socket);
    // stompClient.connect({}, onConnect, onError);
  };

  return (
    <>
      <UserForm onConnect={handleConnect} />
    </>
  );
}

export default App;
