import { HttpResponse } from "@/web-controllers/ports";

export function created(data: any): HttpResponse {
  return {
    statusCode: 201,
    body: data,
  };
}