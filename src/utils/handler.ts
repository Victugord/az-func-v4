import type {
  HttpMethod,
  HttpHandler,
  HttpRequest,
  InvocationContext,
  HttpResponseInit,
  HttpFunctionOptions,
} from "@azure/functions";

type Handlers = {
  [method in HttpMethod]?: HttpHandler;
};

export const AllMethods: HttpMethod[] = [
  "GET",
  "POST",
  "PUT",
  "DELETE",
  "PATCH",
  "HEAD",
  "OPTIONS",
  "TRACE",
];

export type httpOptions = Omit<Omit<HttpFunctionOptions, "methods">, "handler">;

export type HttpHandleOptions = { handlers: Handlers; options?: httpOptions };

export const HttpHandle = (
  httpOptions: HttpHandleOptions
): HttpFunctionOptions => {
  const { handlers, options } = httpOptions;

  const methods = Object.keys(handlers) as HttpMethod[];

  return {
    ...options,
    methods,
    handler: async function handle(
      request: HttpRequest,
      context: InvocationContext
    ): Promise<HttpResponseInit> {
      // Get the handler for the request method
      const handler = handlers[request.method];

      // If there is no handler for the request method, return a 405

      if (!handler) {
        return {
          status: 405,
          body: `Method ${request.method} not allowed`,
        };
      }

      // Otherwise, call the handler
      return handler(request, context);
    },
  };
};
