import React, { useState } from "react";
import styled from "styled-components";
import { IoMdSend } from "react-icons/io";
import { BsImageFill, BsXSquareFill } from "react-icons/bs";

export default function ChatInput({
  handleSendMsg,
  uploadImage,
  setImage,
  image,
}) {
  const [msg, setMsg] = useState("");

  const sendChat = async (event) => {
    event.preventDefault();
    if (msg.length > 0 || image.length > 0) {
      await handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <Container>
      {image.length > 0 && (
        <>
          <div className="img_container">
            <img src={URL.createObjectURL(image[0])} alt="msgImg" />
          </div>
          <div className="delete_img">
            <BsXSquareFill onClick={() => setImage([])} />
          </div>
        </>
      )}
      <form className="input-container" onSubmit={(e) => sendChat(e)}>
        <input
          type="text"
          placeholder="Type your message here"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <input
          type="file"
          id="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={uploadImage}
        />
        <label htmlFor="file" className="img_upload_btn">
          <BsImageFill />
        </label>
        <button className="submit">
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  background-color: #080420;
  padding: 0 2rem;
  padding-bottom: 0.3rem;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
    margin-top: 75%;
  }
  .delete_img {
    color: #ff0;
    position: absolute;
    top: -100px;
    cursor: pointer;
  }
  .img_container {
    border-radius: 5px;
    position: absolute;
    overflow: hidden;
    top: -100px;
    height: 100px;
    width: 100px;
    display: flex;
    align-items: center;
    background: #ffffff34;
    img {
      width: 100%;
      object-fit: contain;
    }
  }
  .input-container {
    width: 100%;
    height: 50%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    background-color: #ffffff34;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      width: 100vh;
      margin-top: -12vh;
    }
    input {
      width: 100%;
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;
      &::selection {
        background-color: #9186f3;
      }
      &:focus {
        outline: none;
      }
    }
    .img_upload_btn {
      padding: 0rem 1rem;
      color: #fff;
      font-size: 24px;
    }
    button {
      padding: 0.2rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #9933ff;
      border: none;
      cursor: pointer;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.5rem 1rem;
        svg {
          font-size: 1rem;
        }
      }
      svg {
        font-size: 2rem;
        color: white;
      }
    }
    label {
      color: #9933ff;
      font-size: 46px;
      margin-top: 8px;
      cursor: pointer;
      margin-right: -18px;
    }
  }
`;
