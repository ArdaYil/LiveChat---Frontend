import { FormEvent, useState } from "react";
import TextInput from "../form/TextInput";
import Button from "../form/Button";

interface Props {
  onMessage: (message: string) => void;
}

const ChatInput = ({ onMessage }: Props) => {
  const [chat, setChat] = useState<string>("");
  const handleChange = (newChat: string) => setChat(newChat);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onMessage(chat);
  };

  return (
    <form onSubmit={handleSubmit} name="chat-message" className="chat-field">
      <TextInput
        dark={true}
        className="chat-field__input"
        onChange={handleChange}
      >
        Enter message...
      </TextInput>
      <Button type="submit">Send</Button>
    </form>
  );
};

export default ChatInput;
