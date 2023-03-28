import {
  app,
  HttpHandler,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";
import { HttpHandle } from "../../utils/handler";

const GetStatus: HttpHandler = async (request, context) => {
  return {
    status: 200,
    body: "OK",
  };
};
app.http(
  "status",
  HttpHandle({
    handlers: {
      GET: GetStatus,
    },
  })
);
