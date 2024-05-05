import ApiClient from "./ApiClient";

interface Chat {
  sender: string;
  message: string;
  time: Date;
}

export default new ApiClient<Chat>("/chat");
