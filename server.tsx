import { renderToReadableStream } from "react-dom/server";
import App from "./src/App";

const server = Bun.serve({
  port: 5000,
  hostname: "0.0.0.0",
  async fetch(req) {
    const url = new URL(req.url);
    
    if (url.pathname === "/") {
      const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Project Tracker</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script type="module" src="/client.js"></script>
</head>
<body>
  <div id="root"></div>
</body>
</html>`;
      
      return new Response(html, {
        headers: {
          "Content-Type": "text/html",
          "Cache-Control": "no-cache"
        }
      });
    }
    
    if (url.pathname === "/client.js") {
      const transpiler = new Bun.Transpiler({
        loader: "tsx",
        target: "browser"
      });
      
      const file = await Bun.file("./src/index.tsx").text();
      const transpiled = await transpiler.transform(file);
      
      return new Response(transpiled, {
        headers: {
          "Content-Type": "application/javascript",
          "Cache-Control": "no-cache"
        }
      });
    }
    
    return new Response("Not Found", { status: 404 });
  }
});

console.log(`Server running at http://localhost:${server.port}`);
