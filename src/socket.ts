import { io } from "socket.io-client";
const URL = "http://192.168.10.3:9001";

export const socket = io(URL);
