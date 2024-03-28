export class CustomException extends Error {
  status: number;
  additionalInfo?: string | Record<string, any>;

  constructor(message: string, status: number, additionalInfo?: string | Record<string, any>) {
    super(message);
    // Ensuring that this class is recognized as an Error subclass in TypeScript
    Object.setPrototypeOf(this, CustomException.prototype);
    this.status = status;
    this.additionalInfo = additionalInfo;
  }
}