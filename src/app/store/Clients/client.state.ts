import { clientModel } from "../model/clients.model";

export const clientState : clientModel = {
    list:[],
    errorMessage:'',
    clientObj:
    {
        id: 0,
        name: "",
        email: "",
        phone: "",
        type: "CUSTOMER",
        address: "",
        clientgroup: "level1",
        status: true
    }
}