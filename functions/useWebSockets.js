import { useEffect, useRef } from "react";
import io from "socket.io-client";

const useWebSockets = () => {
  const socketRef = useRef(null);

  useEffect(() => {
    connectToSocket();
    return () => disconnectFromSocket();
  }, []);

  useEffect(() => {
    socketRef.current.on("prevent_disconnect", () => {
      console.log("received");
      connectToSocket();
    });
  }, [socketRef.current]);

  const connectToSocket = () => {
    if (socketRef.current === null) {
      const socket = io("http://localhost:3000");
      socketRef.current = socket;
    }
  };

  const joinRoom = (userId) => {
    socketRef.current.emit("join", userId);
  };

  const createChat = (creatorId, receiverId) => {
    socketRef.current.emit("createChat", creatorId, receiverId);
    socketRef.current.on("chatCreated", (chatId) => {
      console.log(chatId);
    });
  };

  const disconnectFromSocket = () => {
    if (socketRef.current !== null) {
      socketRef.current.disconnect();
    }
  };

  return {
    socketRef,
    joinRoom,
    createChat,
  };
};

export default useWebSockets;
