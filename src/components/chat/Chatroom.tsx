import { ChatMessage } from "../../App";
import usePublicChatStores from "../../stores/publicChatStore";
import useUserStore from "../../stores/userStore";
import ChatInput from "./ChatInput";

interface Props {
  currentChat: ChatMessage[];
  receiver: string;
  onChange: (message: string) => void;
}

const Chatroom = ({ currentChat, onChange }: Props) => {
  const username = useUserStore((s) => s.user.username);

  const renderTime = (date: string) => {
    const dateObj = new Date(date);
    let minutes = dateObj.getMinutes().toString();
    minutes = minutes.length >= 2 ? minutes : `0${minutes}`;

    return `${dateObj.getHours()}:${minutes}`;
  };

  return (
    <div className="chatroom-container">
      <div className="chatroom">
        {currentChat.map((chat) => {
          console.log(username);
          console.log(chat);
          const currentUser = username === chat.senderName;
          const chatClass = currentUser ? "chat--sent" : "chat--receieved";
          console.log(chat.status);
          return (
            <div
              className={`chat-message ${currentUser ? "sent" : "receieved"}`}
            >
              <span className="chat-message__meta-data">
                {!(currentUser || chat.status == "JOIN") && (
                  <p className="chat-message__meta-data__sender">
                    {chat.senderName}
                  </p>
                )}
                <p className="chat-message__meta-data__date">
                  {renderTime(chat.date)}
                </p>
              </span>
              <p
                className={`${chatClass} ${
                  chat.status == "JOIN" ? "join" : ""
                }`}
              >
                {chat.message}
              </p>
            </div>
          );
        })}
      </div>
      <ChatInput onMessage={onChange} />
    </div>
  );
};

export default Chatroom;
