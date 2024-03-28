import { Request, Response, NextFunction } from "express";
import { RequestLog } from "../models/RequestLog";

const LogRequest = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { method, url, body, headers, path } = req;

    if (path === "/favicon.ico") {
      next();
      return;
    }

    // Extract query parameters from the URL
    const queryParameters = req.query;

    // Log request details including query parameters
    const requestLogData = {
      method,
      url,
      body: JSON.stringify(body),
      headers: JSON.stringify(headers),
      queryparam: JSON.stringify(queryParameters),
    };

    // Create RequestLog data
    RequestLog.create(requestLogData);

    next();
  } catch (error) {
    console.error("Error logging request:", error);
    next(error);
  }
};

export default LogRequest;
