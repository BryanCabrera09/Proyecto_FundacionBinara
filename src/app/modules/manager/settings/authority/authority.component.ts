import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Usuario } from 'src/app/core/models/usuario';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { RolesDialogComponent } from '../roles-dialog/roles-dialog.component';

@Component({
  selector: 'app-authority',
  templateUrl: './authority.component.html',
  styleUrls: ['./authority.component.scss']
})
export class AuthorityComponent implements OnInit {

  users: Usuario[] = [];

  loading: boolean = false;

  constructor(private userServ: UsuarioService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.listUsers();
  }

  listUsers() {
    this.userServ.getUser().subscribe(
      (res) => {
        this.users = res
        this.loading = false;
      }
    )
  }

  openDialog(user: any): void {
    const dialogRef = this.dialog.open(RolesDialogComponent, {
      width: '500px', // Configura el ancho según tus necesidades
      data: { user } // Pasa el objeto user al diálogo
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('El diálogo se cerró', result);
      this.listUsers();
    });
  }
  

}
