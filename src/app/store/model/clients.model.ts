export interface client{
    id:number,
    name:string,
    email:string,
    phone:string,
    type:string,
    address:string,
    clientgroup:string,
    status:boolean
}

export interface clientModel{
    list:client[],
    clientObj:client,
    errorMessage:string
}