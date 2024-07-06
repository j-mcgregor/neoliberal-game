import type { Server } from "bun";
import { pathToRegexp } from "path-to-regexp";
import type { IHandler, IMiddleware, AddMethodProps } from "../types";

export class App {
  routes: Map<Request["method"], Map<string, IHandler>> = new Map();
  port = 8080;
  hostname = "localhost";
  ws?: Server;
  server?: Server;
  middleware: Map<string, IMiddleware> = new Map();
  prefix = "";

  constructor({
    port = Number(process.env.PORT) || 8080,
    hostname = process.env.HOSTNAME || "localhost",
    prefix = "",
  }: {
    port?: number;
    hostname?: string;
    prefix?: string;
  } = {}) {
    this.routes.set("GET", new Map());
    this.routes.set("POST", new Map());
    this.routes.set("PUT", new Map());
    this.routes.set("PATCH", new Map());
    this.routes.set("DELETE", new Map());

    this.prefix = prefix;
    this.port = port;
    this.hostname = hostname;
  }

  serve() {
    this.server = Bun.serve({
      port: this.port,
      hostname: this.hostname,
      development: true,
      fetch: async (request, server) => {
        const url = new URL(request.url);
        const methodRoutes = this.routes.get(request.method);

        if (!methodRoutes) {
          return Response.json(
            { message: "Method routes not found" },
            { status: 404 }
          );
        }

        for await (const [name, middleware] of this.middleware) {
          try {
            const response = await middleware(request, server);

            if (!response.ok) {
              return Response.json(response.data, {
                status: response.status,
                statusText: response.statusText,
              });
            }
          } catch (error) {
            if (error instanceof Response) {
              return error;
            }

            return Response.json({ message: String(error) }, { status: 500 });
          }
        }

        for await (const [path, _handler] of methodRoutes) {
          const regex = pathToRegexp(path);
          const matched = regex.exec(url.pathname);

          if (matched) {
            try {
              const res = await _handler(request, server);

              return res;
            } catch (error) {
              if (error instanceof Response) {
                return error;
              }

              return Response.json({ message: String(error) }, { status: 500 });
            }
          } else {
            continue;
          }
        }

        return Response.json({ message: "Route not found" }, { status: 404 });
      },
      websocket: {
        open(ws) {
          const welcomeMessage =
            "Welcome to the Time Server!!!  Ask 'What's the time' and I will answer.";
          ws.send(welcomeMessage);
          console.log("connection opened");
        },
        message(ws, message) {
          console.log(`incoming message: ${message}`);

          const messageString =
            typeof message === "string"
              ? message
              : new TextDecoder().decode(message);

          if (messageString.trim().toLowerCase() === "what's the time?") {
            const currentTime = new Date().toLocaleTimeString();

            ws.send(`The time is ${currentTime}`);
            return;
          }

          ws.send("i'm just a silly timebot, i can only tell the time");
        },
        close(ws) {
          console.log("connection closed");
        },
      },
    });

    console.log(`Listening on ${this.server.hostname}:${this.server.port}`);
  }

  socket({ port = this.port + 1 } = {}) {
    this.ws = Bun.serve({
      port,
      fetch(request, server) {
        if (server.upgrade(request)) {
          return;
        }

        return new Response("Helloooooo World");
      },
      websocket: {
        open(ws) {
          const welcomeMessage =
            "Welcome to the Time Server!!!  Ask 'What's the time' and I will answer.";
          ws.send(welcomeMessage);
          console.log("connection opened");
        },
        message(ws, message) {
          console.log(`incoming message: ${message}`);

          const messageString =
            typeof message === "string"
              ? message
              : new TextDecoder().decode(message);

          if (messageString.trim().toLowerCase() === "what's the time?") {
            const currentTime = new Date().toLocaleTimeString();

            ws.send(`The time is ${currentTime}`);
            return;
          }

          ws.send("i'm just a silly timebot, i can only tell the time");
        },
        close(ws) {
          console.log("connection closed");
        },
      },
    });
  }

  close() {
    this.server?.stop(true);
  }

  get(path: AddMethodProps["path"], handler: IHandler) {
    this.addMethod({ method: "GET", path, handler });
  }

  post(path: AddMethodProps["path"], handler: IHandler) {
    this.addMethod({ method: "POST", path, handler });
  }

  put(path: AddMethodProps["path"], handler: IHandler) {
    this.addMethod({ method: "PUT", path, handler });
  }

  patch(path: AddMethodProps["path"], handler: IHandler) {
    this.addMethod({ method: "PATCH", path, handler });
  }

  delete(path: AddMethodProps["path"], handler: IHandler) {
    this.addMethod({ method: "DELETE", path, handler });
  }

  addMethod(props: AddMethodProps) {
    const { method, path, handler } = props;

    if (!method || !path) {
      return;
    }

    const METHOD = this.routes.get(method);

    if (!METHOD) {
      return;
    }

    // create a map to store the handler
    // set the path and handler
    if (this.prefix) {
      METHOD.set(`${this.prefix}${path}`, handler);
    } else {
      METHOD.set(path, handler);
    }

    // set the METHOD routes
    this.routes.set(method, METHOD);
  }

  use(props: AddMethodProps) {
    const { method, path, handler } = props;

    if (!handler?.length) {
      return;
    }

    if (method && path) {
      // if method, path and handler, add the handler to the route
      this.addMethod({ method, path, handler });
      return;
    }

    if (path) {
      // if no method, apply the handler to all routes with the path

      // get the routes
      this.routes.forEach((value, key) => {
        // get the routes
        value.forEach((handler, _path) => {
          // check if the path matches
          if (path === _path) {
            // set the handler
            if (this.prefix) {
              value.set(`${this.prefix}${path}`, handler);
            } else {
              value.set(path, handler);
            }
          }
        });
      });
    }
  }

  setMiddleware(middleware: IMiddleware[]) {
    middleware.forEach((fn) => {
      this.middleware.set(fn.name, fn);
    });
  }
}
