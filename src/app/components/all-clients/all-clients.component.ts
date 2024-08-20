import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from "@angular/material/dialog"
import { AddClientsComponent } from '../add-clients/add-clients.component';
import { Store } from '@ngrx/store';
import { MatTableDataSource } from "@angular/material/table"
import { MatPaginator } from "@angular/material/paginator"
import { MatSort } from "@angular/material/sort"
import { client } from '../../store/model/clients.model';
import { deleteClient, getClient, loadClient, openPopup } from '../../store/Clients/client.actions';
import { getClientList } from '../../store/Clients/client.selectors';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-all-clients',
  templateUrl: './all-clients.component.html',
  styleUrl: './all-clients.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllClientsComponent implements OnInit {

  clientList!: client[];
  datasource: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  displayedColums: string[] = ["code", "name", "email", "phone", "address", "type", "group", "status", "action"]
  constructor(private dialog: MatDialog, private store: Store, private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.store.dispatch(loadClient());
    this.store.select(getClientList).subscribe(item => {
      console.log('Client List:', item);
      this.clientList = [...item];
      this.datasource = new MatTableDataSource<client>(this.clientList);
      this.datasource.paginator = this.paginator;
      this.datasource.sort = this.sort;
      this.cdr.markForCheck();
    });
  }

  FunctionAdd() {
    this.OpenPopup(0, 'Create Client');  
  }

  FunctionEdit(code: number) {
    this.OpenPopup(code, 'Update Client');
    this.store.dispatch(getClient({ id: code }))
  }

  FunctionDelete(code: number) {
    if (confirm('do you want to remove?')) {
      this.store.dispatch(deleteClient({ id: code }));
    }
  }

  OpenPopup(code: number, title: string) {
    this.store.dispatch(openPopup());
    this.dialog.open(AddClientsComponent, {
      width: '40%',
      height: '90%',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      data: {
        code: code,
        title: title
      }
    })
  }
}


