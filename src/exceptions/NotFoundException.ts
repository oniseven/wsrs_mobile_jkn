import { CustomException } from "./CustomException";

export class NotFoundException extends CustomException {
  constructor(message: string){
    super(message, 404)
  }
}