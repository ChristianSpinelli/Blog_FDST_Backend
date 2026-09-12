export interface PostRequest{
    title:string;
    description:string;
    body:string;
}

export interface PostResponse{
    id:number;
    title:string;
    description:string;
    body:string;
    author:Author;
}

export interface Author{
    name:string;
}