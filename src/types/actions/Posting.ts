import { pageData } from "../../redux/slice/PostingSlice";

export interface facebookImageDataParams extends pageData {
  file: any;
  Caption: string;
}
