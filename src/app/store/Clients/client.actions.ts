import { createAction, props } from '@ngrx/store';
import { client } from '../model/clients.model';

export const loadClient = createAction('[Client Page] Load Client');
export const loadClientSuccess = createAction('[Client Page] Load Client Success', props<{ list: client[] }>());
export const loadClientFail = createAction('[Client Page] Load Client Fail', props<{ errorMessage: string }>());

export const addClient = createAction('[Client Page] Add Client', props<{ inputData: client }>());
export const addClientSuccess = createAction('[Client Page] Add Client Success', props<{ inputData: client }>());

export const updateClient = createAction('[Client Page] Update Client', props<{ inputData: client }>());
export const updateClientSuccess = createAction('[Client Page] Update Client Success', props<{ inputData: client }>());

export const deleteClient = createAction('[Client Page] Delete Client', props<{ id: number }>());
export const deleteClientSuccess = createAction('[Client Page] Delete Client Success', props<{ code: number }>());

export const getClient = createAction('[Client Page] Get Client', props<{ id: number }>());
export const getClientSuccess = createAction('[Client Page] Get Client Success', props<{ Obj: client }>());

export const openPopup = createAction('[Client Page] Open Popup');
