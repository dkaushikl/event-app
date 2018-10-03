import { ApiResponseStatus } from '../enum/response-status.enum';

export class ApiResponse {
    ResponseStatus: ApiResponseStatus;
    Message: string;
    Data: any;
}
