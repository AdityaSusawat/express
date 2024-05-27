import http from "http";
import crypto from "crypto";
import bcrypt from "bcrypt";

const users = [
  {
    id: crypto.randomUUID(),
    userName: "User1",
    age: 18,
    hashedPassword: "someHashedPassword1",
  },
  {
    id: crypto.randomUUID(),
    userName: "User2",
    age: 19,
    hashedPassword: "someHashedPassword2",
  },
];

const server = http.createServer((req, res) => {
  if (req.url === "/users") {
    res.write(users);
    res.end();
  }
});

// server.on("connection", (socket) => {
//   console.log(socket);
// });

server.listen(3000, () => {
  console.log(`Listening on port 3000`);
});
