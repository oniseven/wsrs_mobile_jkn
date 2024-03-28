import { CustomException } from "./CustomException";

export class AcceptedException extends CustomException {
  constructor(message: string){
    super(message, 202)
  }
}