import { createServer } from "http";
import jwt from "jsonwebtoken";

const users = [
  {
    id: 1,
    username: "user1",
    password: "user1",
  },
  {
    id: 2,
    username: "user2",
    password: "user2",
  },
];

const secretKey = "ThisIsASecretKey";

const server = createServer((req, res) => {
  if (req.method === "POST" && req.url === "/login") {
    let requestBody = "";

    req.on("data", (chunk) => {
      requestBody += chunk;
    });

    req.on("end", () => {
      console.log(JSON.parse(requestBody));
    });

    res.write(requestBody);

    // req.on("end", () => {
    //   try {
    //     const { username, password } = JSON.parse(requestBody);
    //     console.log(JSON.parse(requestBody));
    //     const user = users.find(
    //       (e) => e.username === username && e.password === password
    //     );
    //     //console.log(user);
    //     if (user) {
    //       //If user found
    //       const token = jwt.sign(
    //         { id: user.id, username: user.username },
    //         secretKey,
    //         { expiresIn: 86400 }
    //       );
    //       res.writeHead(200, { "Content-Type": "application/json" });
    //       res.end(JSON.stringify({ token }));
    //     } else {
    //       //if user not found
    //       res.writeHead(401, { "Content-Type": "text/plain" });
    //       res.end("Invalid credentials");
    //     }
    //   } catch (error) {
    //     res.writeHead(400, { "Content-Type": "text/plain" });
    //     res.end("Invalid JSON format");
    //   }
    // });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Invalid credentials");
  }
});

const PORT = process.env.PORT || 3777;

server.listen(PORT, () => {
  console.log("Listening to ${PORT}");
});
