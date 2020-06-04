export interface IServiceOptions {
  apiKey: string;
  onInvalidCredentials?: Function;
}

export class SimilarWebError extends Error {
  public code: number;
  public isSimilarWebError = true;

  constructor(message: string, code: number) {
    super(message);
    this.code = code;
  }
}
