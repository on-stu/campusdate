import { createContext } from "react";
import io from "socket.io-client";

export const socket = io("http://3.34.1.175:3000/", { autoConnect: true });
const SocketContext = createContext(socket);

export default SocketContext;
