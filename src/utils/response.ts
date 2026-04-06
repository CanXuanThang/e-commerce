import { NextFunction, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {
  successResponse,
  errorResponse,
  unauthorizedResponse,
  notHavePermissionResponse,
} from "../constants/response";
const ok = <T>(res: Response, data: T, message = "Success") => {
  const response = successResponse(data, message);
  return res.status(StatusCodes.OK).json(response);
};
const notFound = <T>(res: Response, data: T, message = "Not found") => {
  const response = errorResponse(data, message);
  return res.status(StatusCodes.NOT_FOUND).json(response);
};
const badRequest = <T>(res: Response, data: T, message = "Bad request") => {
  const response = errorResponse(data, message);
  return res.status(StatusCodes.BAD_REQUEST).json(response);
};
const serverError = <T>(res: Response, data: T, message = "Error") => {
  const response = errorResponse(data, message);
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
};
const unauthorization = (res: Response, message = "Not authenticated") => {
  const response = unauthorizedResponse(message);
  return res.status(StatusCodes.UNAUTHORIZED).json(response);
};
const notHavePermission = <T>(
  res: Response,
  data: T,
  message = "You do not have permission to access",
) => {
  const response = errorResponse(data, message);
  return res.status(StatusCodes.METHOD_NOT_ALLOWED).json(response);
};
const forbidden = <T>(res: Response, message = "Access forbidden") => {
  const response = notHavePermissionResponse(message);
  return res.status(StatusCodes.FORBIDDEN).json(response);
};

export const response = {
  ok,
  notFound,
  badRequest,
  serverError,
  unauthorization,
  notHavePermission,
  forbidden,
};
