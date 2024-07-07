class ValidationException extends Error {
    statusCode: number;
  
    constructor(message: string) {
      super(message);
      this.statusCode = 422;
    }
  }
  
  export default ValidationException;