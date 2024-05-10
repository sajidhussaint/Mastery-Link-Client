import { io } from "socket.io-client"
const URL = "https://psychological-jori-masterylink-e6778f0d.koyeb.app/";
// const URL = "http://localhost:4000/"

export const socket = io(URL)
