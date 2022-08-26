import { HttpResponse } from "@/web-controllers/ports";

export function created(data: any): HttpResponse {
  return {
    statusCode: 201,
    body: data,
  };
}

export function badRequest(data: any): HttpResponse {
  return {
    statusCode: 400,
    body: data,
  };
}

export function serverError(data: any): HttpResponse {
  return {
    statusCode: 500,
    body: data,
  };
}