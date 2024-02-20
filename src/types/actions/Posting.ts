import { MessageModel } from "@chatscope/chat-ui-kit-react";
import { pageItem } from "../../redux/slice/PostingSlice";
import { MessageDirection } from "@chatscope/chat-ui-kit-react/src/types/unions";

export interface facebookImageDataParams extends pageItem {
  file: any;
  Caption: string;
}
export interface chatMessage extends MessageModel {
  role: string;
  content: string;
  direction: MessageDirection;
}
