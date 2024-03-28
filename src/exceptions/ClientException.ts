import { CustomException } from "./CustomException";

export class ClientException extends CustomException {
  constructor(message: string){
    super(message, 400)
  }
}