import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, Validators, FormGroup } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Store } from '@ngrx/store';
import { client } from '../../store/model/clients.model';
import { addClient, updateClient } from '../../store/Clients/client.actions';
import { getClient } from '../../store/Clients/client.selectors';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-add-clients',
  templateUrl: './add-clients.component.html',
  styleUrls: ['./add-clients.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddClientsComponent implements OnInit {
  title = 'Add Client';
  isedit = false;
  dialogdata: any;
  clientForm: FormGroup;

  constructor(private ref: MatDialogRef<AddClientsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private store: Store,  private cdr: ChangeDetectorRef) {

    this.clientForm = new FormGroup({
      id: new FormControl(0),
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      type: new FormControl('CUSTOMER'),
      group: new FormControl('level1'),
      status: new FormControl(true)
    });
  }

  ngOnInit(): void {
    this.dialogdata = this.data;
    this.title = this.dialogdata.title;
    this.store.select(getClient).subscribe(res => { 
      if(res){
      this.clientForm.setValue({
        id: res.id, name: res.name, email: res.email, phone: res.phone,
        address: res.address, group: res.clientgroup, type: res.type, status: res.status
      });
      this.cdr.markForCheck();
    }
    });
  }

  ClosePopup() {
    this.ref.close();
  }

  SaveClient() {
    if (this.clientForm.valid) {
      const _Obj: client = {
        id: this.clientForm.value.id as number,
        name: this.clientForm.value.name as string,
        email: this.clientForm.value.email as string,
        phone: this.clientForm.value.phone as string,
        clientgroup: this.clientForm.value.group as string,
        address: this.clientForm.value.address as string,
        type: this.clientForm.value.type as string,
        status: this.clientForm.value.status as boolean
      };
      if (_Obj.id === 0) {
        this.store.dispatch(addClient({ inputData: _Obj }));
      } else {
        this.store.dispatch(updateClient({ inputData: _Obj }));
      }
      this.ClosePopup();
    }
  }
  }

