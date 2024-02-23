import { pageItem } from "../../redux/slice/PostingSlice";

export interface facebookImageDataParams extends pageItem {
  file: any;
  Caption: string;
  imgUrl: string;
}

export interface PostCaption {
  Caption: string;
}
