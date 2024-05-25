import { useEffect, useState } from "react";
import "../cssDist/index.css";
import UserForm from "./components/UserForm";
import useUserStore from "./stores/userStore";
import { Client, Frame, Message, over } from "stompjs";
import SockJS from "sockjs-client/dist/sockjs";
import ActiveUsers from "./components/chat/ActiveUsers";
import Chatroom from "./components/chat/Chatroom";
import usePublicChatStores from "./stores/publicChatStore";

export interface ChatMessage {
  senderName: string;
  message: string;
  date: string;
  status: "JOIN" | "MESSAGE" | "LEAVE";
}

let stompClient: Client | null = null;

const connectionEndpoint = "http://localhost:8080/ws";

function App() {
  const [publicChats, setPublicChats] = useState<ChatMessage[]>([]);
  const [privateChats, setPrivateChats] = useState(
    new Map<string, ChatMessage[]>()
  );
  const { user, setUser } = useUserStore();

  const handleRegisterUser = () => {
    const sock = new SockJS(connectionEndpoint);
    stompClient = over(sock);
    stompClient.connect({}, onConnect, onError);
  };

  const onConnect = () => {
    setUser({ connected: true });
    stompClient?.subscribe("/chatroom/public", onPublicMessageReceived);
    stompClient?.subscribe(
      `/user/${user.username}/private`,
      onPrivateMessageReceived
    );
  };

  function onPublicMessageReceived(payload: Message) {
    console.log("Message");
    const data: ChatMessage = JSON.parse(payload.body);

    switch (data.status) {
      case "JOIN":
        break;

      case "MESSAGE":
        publicChats.unshift(data);
        setPublicChats([...publicChats]);
        break;

      case "LEAVE":
        break;
    }
  }

  const onPrivateMessageReceived = (payload: Message) => {
    console.log("Message");
    const payloadData: ChatMessage = JSON.parse(payload.body);

    if (privateChats.get(payloadData.senderName)) {
      privateChats.get(payloadData.senderName)?.push(payloadData);
      setPrivateChats(new Map(privateChats));
    } else {
      const list = [] as ChatMessage[];
      list.push(payloadData);

      privateChats.set(payloadData.senderName, list);
      setPrivateChats(privateChats);
    }
  };

  const onError = (exception: string | Frame) => {
    console.log(exception);
  };

  const handleMessage = (message: string) => {
    sendPublicMessage(message);
  };

  const sendPublicMessage = (message: string) => {
    if (!stompClient) return;

    const chatMessage: ChatMessage = {
      senderName: user.username,
      message,
      date: new Date(),
      status: "MESSAGE",
    };

    stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
  };

  return (
    <>
      {!user.connected && <UserForm onRegister={handleRegisterUser} />}
      {user.connected && (
        <div className="main">
          <ActiveUsers activeUsers={privateChats} />
          <Chatroom currentChat={publicChats} onChange={handleMessage} />
        </div>
      )}
    </>
  );
}

export default App;
