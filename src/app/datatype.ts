export interface SignUp{
    name:string,
    password:string,
    email:string
}
export interface login{
    password:string,
    email:string
}
export interface Product {
    id: number;
    name: string;
    price: number;
    description:string;
    // Add any other product properties
  }