interface IApiResponse {
  success: boolean;
  status: Number;
  message: string;
  data: any;
}

class ApiResponse implements IApiResponse {
  constructor(
    public success: boolean,
    public status: Number,
    public message: string,
    public data: any,
  ) {}
}

export default ApiResponse;
