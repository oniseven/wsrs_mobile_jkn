import { CustomException } from "./CustomException";

export class UnprocessableException extends CustomException {
  constructor(message: string){
    super(message, 422)
  }
}