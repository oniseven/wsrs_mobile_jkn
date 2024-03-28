import { CustomException } from "./CustomException";

export class ForbiddenException extends CustomException {
  constructor(message: string){
    super(message, 403)
  }
}