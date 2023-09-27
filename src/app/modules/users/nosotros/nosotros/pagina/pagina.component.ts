
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import baserUrl from 'src/app/core/helpers/helperUrl';
import { Parametropost } from 'src/app/core/models/parametropost';
import { Parametro } from 'src/app/core/models/parametros';
import { Proyectos } from 'src/app/core/models/proyectos';
import { ParametrosService } from 'src/app/core/services/parametros.service';
import { ProyectosService } from 'src/app/core/services/proyectos.service';


@Component({
  selector: 'app-pagina',
  templateUrl: './pagina.component.html',
  styleUrls: ['./pagina.component.scss']
})
export class PaginaComponent implements OnInit {

 
  imagen: any = "link de imagen";
  baseUrl: string= baserUrl;
  
  imageng?: File;

  parametroArray?:Parametro[];

  parametro:Parametropost =new Parametropost();


  constructor(private router: Router, private parametroServicio : ParametrosService ) { }

  ngOnInit() {
    this.parametroServicio.listparm().subscribe(
      parametros => {
      this.parametroArray = parametros;
      console.log(this.parametroArray);
    });
    
  }

  //Previsualizar imagen
imageSrc: string | ArrayBuffer | null = null;
onFileSelected(event: any): void {
  const input = event.target;
  this.imageng = event.target.files[0]
  console.log(this.imagen)
  if(input.files && input.files[0]){
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imageSrc = e.target.result;
      this.imagen = e.target.result;
    };
    reader.readAsDataURL(input.files[0]);
  }
}



Guardar() {

  this.parametro.visible=true;
  this.parametroServicio.crearpa(this.parametro).subscribe(
    (data:any) => {
      console.log(data.parametro)
      console.log(data.parametro._id);
        if(this.imageng){
          this.parametroServicio.guardarImagen(data.parametro._id,this.imageng).subscribe(
            data=>{
              console.log("imagen guardada")
            }
          )
        }
      
    }
    );
}

listaredit(id:any) {
  this.parametroServicio.buscarparam(id).subscribe(
    p=>this.parametro=p
  )
}

  goToArticle(e: any) {
    this.router.navigate(['usuario/ver/proyecto']);
  }

  getForm(): void {
    var 
    btnAbrirPopup = document.getElementById('btn-abrir-popup'),
    overlay = document.getElementById('overlay'),
      popup = document.getElementById('popup'),
    btnAbrirPopup2 = document.getElementById('btn-abrir-popup2'),
    
    overlay2 = document.getElementById('overlay2'),
    popup2 = document.getElementById('popup2'),
    btnCerrarPopup = document.getElementById('btn-cerrar-popup');


    btnAbrirPopup?.addEventListener('click', function () {
      overlay?.classList.add('active');
      popup?.classList.add('active');

    });
    btnAbrirPopup2?.addEventListener('click', function () {
      overlay2?.classList.add('active');
      popup2?.classList.add('active');

    });

    btnCerrarPopup?.addEventListener('click', function () {
      overlay?.classList.remove('active');
      popup?.classList.remove('active');
    });
  }

  onClose(): void {
    var popup = document.getElementById("overlay");
    var botonGuardar = document.getElementById("publicar");
    botonGuardar?.addEventListener("click", function () {
      window.close;
    });
  }
}

