export class ErrorDto {
  constructor(public status: number, public message: string) {
    this.message = message;
    this.status = status;
  }
}
