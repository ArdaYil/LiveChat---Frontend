import { useEffect, useState } from "react";
import "../cssDist/index.css";
import UserForm from "./components/UserForm";
import useUserStore from "./stores/userStore";
import { Client, Frame, Message, over } from "stompjs";
import SockJS from "sockjs-client/dist/sockjs";
import ActiveUsers from "./components/chat/ActiveUsers";
import Chatroom from "./components/chat/Chatroom";
import usePublicChatStores from "./stores/publicChatStore";

type Status = "JOIN" | "MESSAGE" | "LEAVE";
export interface ChatMessage {
  senderName: string;
  message: string;
  date: string;
  receiverName: string;
  status: Status;
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

    sendPublicMessage(`${user.username} has joined the chat`, "JOIN");
    //sendPrivateMessage(`${user.username} has joined the chat`, "JOIN");
  };

  function onPublicMessageReceived(payload: Message) {
    console.log("Message");
    const data: ChatMessage = JSON.parse(payload.body);

    if (data.status == "JOIN") {
      const list = [] as ChatMessage[];

      privateChats.set(data.senderName, list);
      setPrivateChats(privateChats);
    }

    publicChats.unshift(data);
    setPublicChats([...publicChats]);
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
    sendPublicMessage(message, "MESSAGE");
  };

  const getMessage = (message: string, status: Status, receiverName = "") => {
    const chatMessage: ChatMessage = {
      senderName: user.username,
      message,
      receiverName,
      date: new Date().toISOString(),
      status: status,
    };

    return chatMessage;
  };

  const sendPublicMessage = (message: string, status: Status) => {
    if (!stompClient) return;

    stompClient.send(
      "/app/message",
      {},
      JSON.stringify(getMessage(message, status))
    );
  };

  const sendPrivateMessage = (
    message: string,
    status: Status,
    receiverName: string
  ) => {
    if (!stompClient) return;

    stompClient.send(
      "/app/private-message",
      {},
      JSON.stringify(getMessage(message, status, receiverName))
    );
  };

  return (
    <>
      {!user.connected && <UserForm onRegister={handleRegisterUser} />}
      {user.connected && (
        <div className="main">
          <div />
          <Chatroom currentChat={publicChats} onChange={handleMessage} />
        </div>
      )}
    </>
  );
}

export default App;
