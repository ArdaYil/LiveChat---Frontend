import { create } from "zustand";
import { ChatMessage } from "../App";

interface PublicChatStore {
  publicChats: ChatMessage[];
  setPublicChats: (publicChats: Array<ChatMessage>) => void;
}

const usePublicChatStores = create<PublicChatStore>((set) => ({
  publicChats: [],
  setPublicChats: (publicChats: ChatMessage[]) =>
    set(() => ({ publicChats: publicChats })),
}));

export default usePublicChatStores;
