// http.js
const http = require("http");

let fruits = ["Apple", "Banana", "Mango"]; // Our array

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");

  // ✅ GET → Show all fruits
  if (req.method === "GET" && req.url === "/fruits") {
    res.writeHead(200);
    res.end(JSON.stringify({ fruits }));
  }

  // ✅ POST → Add a new fruit
  else if (req.method === "POST" && req.url === "/fruits") {
    let body = "";
    req.on("data", chunk => (body += chunk.toString()));

    req.on("end", () => {
      try {
        const data = JSON.parse(body);
        if (data.fruit) {
          fruits.push(data.fruit);
          res.writeHead(201);
          res.end(JSON.stringify({ message: "Fruit added", fruits }));
        } else {
          res.writeHead(400);
          res.end(JSON.stringify({ error: "Missing 'fruit' key" }));
        }
      } catch {
        res.writeHead(400);
        res.end(JSON.stringify({ error: "Invalid JSON" }));
      }
    });
  }

  // ✅ PUT → Update a fruit by index
  else if (req.method === "PUT" && req.url.startsWith("/fruits/")) {
    const index = parseInt(req.url.split("/")[2]);
    let body = "";
    req.on("data", chunk => (body += chunk.toString()));

    req.on("end", () => {
      try {
        const data = JSON.parse(body);
        if (fruits[index] !== undefined && data.fruit) {
          fruits[index] = data.fruit;
          res.writeHead(200);
          res.end(JSON.stringify({ message: "Fruit updated", fruits }));
        } else {
          res.writeHead(404);
          res.end(JSON.stringify({ error: "Invalid index or missing fruit" }));
        }
      } catch {
        res.writeHead(400);
        res.end(JSON.stringify({ error: "Invalid JSON" }));
      }
    });
  }

  // ✅ DELETE → Remove a fruit by index
  else if (req.method === "DELETE" && req.url.startsWith("/fruits/")) {
    const index = parseInt(req.url.split("/")[2]);
    if (fruits[index] !== undefined) {
      fruits.splice(index, 1);
      res.writeHead(200);
      res.end(JSON.stringify({ message: "Fruit deleted", fruits }));
    } else {
      res.writeHead(404);
      res.end(JSON.stringify({ error: "Fruit not found" }));
    }
  }

  // ❌ Handle other routes
  else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: "Not Found" }));
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log('Server running on http://localhost:${PORT}');
});