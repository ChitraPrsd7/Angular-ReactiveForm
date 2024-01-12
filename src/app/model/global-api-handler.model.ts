// global-api-handler.model.ts
export interface GlobalApiHandler<T> {
    status: string;
    httpStatus: string;
    timestamp: Date;
    message: string;
    data: T
  }