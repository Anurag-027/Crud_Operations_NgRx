import { Injectable } from "@angular/core";
import {createEffect, ofType } from "@ngrx/effects";
import { Actions } from "@ngrx/effects";
import { clientsService } from "../../services/clients.service";
import {
    addClient,
    addClientSuccess,
    deleteClient,
    deleteClientSuccess,
    getClient,
    getClientSuccess,
    loadClient,
    loadClientFail,
    loadClientSuccess,   
    updateClient,
    updateClientSuccess
} from "./client.actions";
import { catchError, exhaustMap, map, of, switchMap, pipe, mergeMap, concatMap } from "rxjs";
import { showalert } from "../Common/app.actions";
              
@Injectable()
export class clientEffects {
    constructor(private actions$: Actions, private service: clientsService) {}

     loadClient$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadClient),         
            exhaustMap(() =>
                this.service.GetAll().pipe(
                    map(data => loadClientSuccess({ list: data })),
                    catchError(error => of(loadClientFail({ errorMessage: error.message })))
                )
            )
        )
    );

    getClient$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getClient),
            switchMap(action => 
                this.service.Getbycode(action.id).pipe(
                    map(data => getClientSuccess({ Obj: data })),
                    catchError(error => of(showalert({ message: 'Failed to fetch data: ' + error.message, resulttype: 'fail' })))
                )
            )
        )
    );
      
    addClient$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addClient),
            switchMap(action =>
                this.service.Create(action.inputData).pipe(
                    switchMap((createdClient) => [ 
                        addClientSuccess({ inputData: createdClient }),
                        showalert({ message: 'Created successfully.', resulttype: 'pass' })
                    ]),
                    catchError(error => of(showalert({ message: 'Failed to create client', resulttype: 'fail' })))
                )
            )
        )
    );
    
    updateClient$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateClient),
            switchMap(action =>
                this.service.Update(action.inputData).pipe(
                    switchMap(() => [
                        updateClientSuccess({ inputData: action.inputData }),
                        showalert({ message: 'Updated successfully.', resulttype: 'pass' })
                    ]),
                    catchError(error => of(showalert({ message: 'Failed to update client', resulttype: 'fail' })))
                )
            )
        ) 
    );

    deleteClient$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteClient),
            switchMap(action =>
                this.service.Delete(action.id).pipe(
                    switchMap(() => [
                        deleteClientSuccess({ code: action.id }),
                        showalert({ message: 'Deleted successfully.', resulttype: 'pass' })
                    ]),
                    catchError(error => of(showalert({ message: 'Failed to delete client', resulttype: 'fail' })))
                )
            )
        )
    );
}
