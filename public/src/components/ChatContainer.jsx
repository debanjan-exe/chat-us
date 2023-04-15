import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Logout from "../components/Logout";
import ChatInput from "../components/ChatInput";
import axios from "axios";
import { getAllMessagesRoute, sendMessageRoute } from "../utils/APIRoutes";
import { v4 as uuidv4 } from "uuid";

export default function ChatContainer({ currentChat, currentUser, socket }) {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [image, setImage] = useState([]);
  // const [allImage, setAllImage] = useState("");
  const scrollRef = useRef();

  const uploadImage = async (e) => {
    const files = e.target.files;
    setImage([files[0]]);
  };

  useEffect(() => {
    (async () => {
      if (currentChat) {
        const response = await axios.post(getAllMessagesRoute, {
          from: currentUser._id,
          to: currentChat._id,
        });
        // console.log(response.data,"HEllo");
        setMessages(response.data);
      }
    })();
  }, [currentChat, currentUser]);

  const handleSendMsg = async (msg) => {
    let imageUrl;

    if (
      image.length > 0 &&
      (image[0].type === "image/jpeg" || image[0].type === "image/png")
    ) {
      const data = new FormData();
      data.append("file", image[0]);
      data.append("upload_preset", "chatUs");
      data.append("cloud_name", "depwir8rx");
      await fetch("https://api.cloudinary.com/v1_1/depwir8rx/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data.url.toString());
          imageUrl = data.url.toString();
        })
        .catch((err) => {
          console.log(err);
        });
    }

    await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg ? msg : "",
      image: image.length > 0 ? imageUrl : "",
    });

    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: currentUser._id,
      message: msg ? msg : "",
      image: image.length > 0 ? imageUrl : "",
    });

    const msgs = [...messages];
    msgs.push({
      fromSelf: true,
      message: msg,
      image: image.length > 0 ? imageUrl : "",
    });
    setMessages(msgs);
    setImage([]);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-receive", (data) => {
        console.log(data);
        setArrivalMessage({
          fromSelf: false,
          message: data.message,
          image: data.image,
        });
      });
    }
  }, [socket]);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  return (
    <>
      {currentChat && (
        <Container>
          <div className="chat-header">
            <div className="user-details">
              <div className="avatar">
                <img
                  src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                  alt="avatar"
                />
              </div>
              <div className="username">
                <h3>{currentChat.username}</h3>
              </div>
            </div>
            <Logout />
          </div>
          <div className="chat-messages">
            {messages.map((message) => {
              return (
                <div ref={scrollRef} key={uuidv4()}>
                  <div
                    className={`message ${
                      message.fromSelf ? "sended" : "received"
                    }`}
                  >
                    <div className="content">
                      <p>{message.message}</p>
                      {message.image && (
                        <div
                          className="msg_img_container"
                          onClick={() => window.open(message.image, "_blank")}
                        >
                          <img src={message.image} alt="msgImage" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <ChatInput
            image={image}
            setImage={setImage}
            handleSendMsg={handleSendMsg}
            uploadImage={uploadImage}
          />
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  padding-top: 1rem;
  display: grid;
  grid-template-rows: 10% 78% 12%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 17% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .msg_img_container {
      padding-top: 5px;
      width: 200px;
      img {
        width: 100%;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #4f04ff21;
      }
    }
    .received {
      justify-content: flex-start;
      .content {
        background-color: #9900ff20;
      }
    }
  }
`;
