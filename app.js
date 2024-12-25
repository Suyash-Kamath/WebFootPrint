const http = require("http");
const fs = require("fs");
const path = require("path");

// File to store visitor logs
const logFile = path.join(__dirname, "visitorLog.txt");

// Function to log visitor data
const logVisitor = (ip, time) => {
  const logEntry = `IP: ${ip}, Time: ${time}\n`;
  fs.appendFileSync(logFile, logEntry); // Append log to the file
};

// Set up the server
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    // Get visitor's IP and current time
    const visitorIP = req.socket.remoteAddress || "Unknown IP";
    const visitTime = new Date().toISOString();

    // Log the visitor
    logVisitor(visitorIP, visitTime);

    // Serve HTML response
    const html = `
   <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>WebFootprint</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      background-color: #f4f4f4;
      color: #333;
    }
    h1 {
      font-size: 2rem;
      margin-bottom: 10px;
    }
    p {
      font-size: 1rem;
      color: #555;
    }
  </style>
</head>
<body>
  <h1>Welcome to the WebFootprint !</h1>
  <p>Your visit has been logged, and your IP address is ${visitorIP}</p>
</body>
</html>

    `;

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(html);
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
  }
});

// Start the server
server.listen(8000, () => {
  console.log("Server is running on port 8000");
});
