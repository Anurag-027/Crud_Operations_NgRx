import { createFeatureSelector, createSelector } from "@ngrx/store";
import { clientModel } from "../model/clients.model";

const getClientState = createFeatureSelector<clientModel>('clients');

export const getClientList = createSelector(getClientState, (state) => {
    return state.list;
})

export const getClient = createSelector(getClientState, (state) => {
    return state.clientObj;
})