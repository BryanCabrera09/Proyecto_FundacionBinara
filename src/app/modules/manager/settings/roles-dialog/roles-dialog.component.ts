import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Usuario } from 'src/app/core/models/usuario';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-roles-dialog',
  templateUrl: './roles-dialog.component.html',
  styleUrls: ['./roles-dialog.component.scss']
})
export class RolesDialogComponent implements OnInit {

  authorities: any[] = [
    { label: 'ADMIN', value: 'ADMIN_ROLE' },
    { label: 'USER', value: 'USER_ROLE' }
  ];
  selectedRole?: string;
  estado?: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: DialogRef, 
    private userServ: UsuarioService ) { }


  ngOnInit() {
    this.selectedRole = this.data.user.rol;
    this.estado = this.data.user.estado;
  }

  closeDialog() {
    this.dialogRef.close();
  }

  async editar() {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Se guardarán los cambios.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, guardar',
      cancelButtonText: 'No, cancelar',
    });
  
    if (result.isConfirmed) {
      let usuario = new Usuario();
      usuario.correo = this.data.user.correo;
      usuario.estado = this.estado;
      usuario.rol = this.selectedRole;
      this.userServ.editUser(usuario, this.data.user.uid).subscribe(
        (res) => {
          this.closeDialog();
          Swal.fire('Guardado', 'Los cambios han sido guardados.', 'success');
        },
        (error) => {
          console.error(error);
          Swal.fire('Error', 'Hubo un problema al guardar los cambios.', 'error');
        }
      );
    }
  }
  

}
