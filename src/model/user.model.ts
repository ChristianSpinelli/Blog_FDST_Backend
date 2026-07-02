export interface UserPayload {
  id: number;
  role: string;
}

export interface UserRequest {
  name:string;
  username:string;
  email:string;
  password:string;
  role:string;
}

export interface UserResponse {
  id:number;
  name:string;
  username:string;
  email:string;
  role:string;
}