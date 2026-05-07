import { Server } from "socket.io";

let io: Server;

export const initSocket = (server: any) => {
  io = new Server(server, {
    cors: {
      origin: [
        "https://e-commerce-nextjs-one-pi.vercel.app",
        "http://localhost:3001",
      ],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    socket.on("join_admin", () => {
      socket.join("admin_room");
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.IO chưa được khởi tạo");
  }

  return io;
};
