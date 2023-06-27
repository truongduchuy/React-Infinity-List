type ResponseGenerator<T> = {
  config?: any;
  data: T;
  headers?: any;
  request?: any;
  status?: number;
  statusText?: string;
};

export type { ResponseGenerator };
