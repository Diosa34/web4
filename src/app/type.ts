export interface ApiResponse<R> {
  isSuccess: boolean;
  type: string;
  data: R;
}

export interface QueryParams {
  [key: string]: any;
}

export interface ApiError{
  message: string,
  type: string,
}

export interface Point {
  x: number;
  y: number;
  r: number;
}

export interface User {
  username: string;
  password: string;
}

export interface TableString {
  "id": number,
  "x": number,
  "y": number,
  "r": number,
  "res": boolean,
  "executionTime": number,
  "message": string,
  "dateTime": string,
  "username": string
}

