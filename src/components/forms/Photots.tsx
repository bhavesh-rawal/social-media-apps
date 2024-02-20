import React, { useState } from "react";
import { Row } from "react-bootstrap";
import { Inputs } from "../common/Inputs";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "antd";
import { ButtonCreative, UploadButton } from "../common/Button";
import { FacebookImgPost, InstaPostImage } from "../../redux/actions/actions";
import Swal from "sweetalert2";
const Photots = () => {
  const dispatch = useDispatch<any>();
  const { selectPage } = useSelector((state: any) => state.Post);
  const [file, setfile] = useState({ name: "" });
  const [caption, setCaption] = useState<any>({ Caption: "" });
  const onFinishFB = async () => {
    if (selectPage) {
      const value = { ...caption, file, ...selectPage };
      await dispatch(FacebookImgPost(value));
      await dispatch(InstaPostImage(value));
      await Swal.fire("Post!", "Your Photo Post SuccussFully!", "success");
      setfile({ name: "" });
      setCaption({ Caption: "" });
    } else {
      alert("Please Select Page");
    }
  };
  return (
    <>
      <Card
        hoverable
        title="Post Images"
        bordered={false}
        className="card-gradientFB col-4 px-3 pb-4"
      >
        <div>
          <UploadButton
            className="col-12 m-3"
            name="Image"
            onChange={(e: any) => setfile(e.target.files[0])}
          />
          <span className="fileName">{file.name}</span>
          <Inputs
            class="col-12"
            holder="Caption Photos"
            value={caption.Caption || ""}
            change={(e: any) => setCaption({ [e.target.name]: e.target.value })}
            nam="Caption"
            typs="text"
          />
          <div className="d-block w-100">
            <ButtonCreative onClick={onFinishFB} type="button">
              Upload Image
            </ButtonCreative>
          </div>
        </div>
      </Card>
    </>
  );
};

export default Photots;
