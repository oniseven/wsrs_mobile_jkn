import { Request, Response, NextFunction } from 'express'
import { IResponseMetadata } from '../types/IResponseMetadata';
import { IJwtPayload } from '../types/IJwtPayload';

// express response extended interface
declare global {
  namespace Express {
    interface Request {
      payload: IJwtPayload
    }

    interface Response {
      withData(response: any, code?: number | boolean, message?: string ): Response;
      noData(code?: number | boolean, message?: string ): Response;
      withErrorCode(options: {
        code?: number | boolean;
        message?: string;
        errCode?: string | null;
        response?: any;
      }): Response;
    }
  }
}

const ResponseHandler = (req: Request, res: Response, next: NextFunction) => {
  res.withData = function(response: any, code = 200, message = 'success'){
    const metadata: IResponseMetadata = {
      metadata: {
        code,
        message
      },
      response
    }
    return this.json(metadata)
  }

  res.noData = function (code = 200, message = "success") {
    const metadata: IResponseMetadata = {
      metadata: {
        code,
        message
      }
    }
    return this.json(metadata)
  }

  res.withErrorCode = function ({
    code = 200,
    message = "success",
    errCode = null,
    response,
  }: {
    code?: number | boolean;
    message?: string;
    errCode?: number | string | null;
    response?: any;
  }) {
    const metadata: IResponseMetadata = {
      metadata: {
        code,
        message,
        errCode,
      },
      response
    }
    return this.json(metadata)
  }

  next()
}

export default ResponseHandler
