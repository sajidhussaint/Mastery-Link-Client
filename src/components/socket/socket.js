import { io } from "socket.io-client"
// const URL = "https://server.eduvista.site/";
const URL = "http://localhost:4000/"

export const socket = io(URL)
