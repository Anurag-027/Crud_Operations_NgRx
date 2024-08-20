import { createReducer, on } from "@ngrx/store";
import { clientState } from "./client.state";
import { 
    addClientSuccess, deleteClientSuccess, getClientSuccess, 
    loadClientFail, loadClientSuccess, openPopup, updateClientSuccess 
} from "./client.actions";

export const _clientReducer = createReducer(
    clientState,
    on(loadClientSuccess, (state, action) => ({
        ...state, 
        list: [...action.list],
        errorMessage: ''
    })),
    
    on(getClientSuccess, (state, action) => ({
        ...state,
        clientObj: action.Obj,
        errorMessage: ''
    })),

    on(loadClientFail, (state, action) => ({
        ...state,
        list: [],
        errorMessage: action.errorMessage
    })),

    on(addClientSuccess, (state, action) => {
        const newClient = action.inputData;
        return {
          ...state,
          list: [...state.list, newClient],
          errorMessage: ''
        };
      }),
      
    on(updateClientSuccess, (state, action) => ({
        ...state,
        list: state.list.map(o => o.id === action.inputData.id ? action.inputData : o),
        errorMessage: ''
    })),

    on(deleteClientSuccess, (state, action) => ({
        ...state,
        list: state.list.filter(o => o.id !== action.code),
        errorMessage: ''
    })),

    on(openPopup, (state) => ({
        ...state,
        clientObj: {
            id: 0,
            name: "",
            email: "",
            phone: "",
            type: "CUSTOMER",
            address: "",
            clientgroup: "level1",
            status: true
        }
    }))
);
