import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-roles-dialog',
  templateUrl: './roles-dialog.component.html',
  styleUrls: ['./roles-dialog.component.css']
})
export class RolesDialogComponent {

  roles: any[] = [
    { label: 'Admin', value: 'admin' },
    { label: 'Usuario', value: 'user' }
  ];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

}
