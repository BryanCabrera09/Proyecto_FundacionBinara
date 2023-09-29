
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import baserUrl from 'src/app/core/helpers/helperUrl';
import { Parametropost } from 'src/app/core/models/parametropost';
import { Parametro } from 'src/app/core/models/parametros';
import { ParametrosService } from 'src/app/core/services/parametros.service';
import { InfoDialogComponent } from '../info-dialog/info-dialog.component';
import { StorageService } from 'src/app/core/services/storage.service';


@Component({
  selector: 'app-pagina',
  templateUrl: './pagina.component.html',
  styleUrls: ['./pagina.component.scss']
})
export class PaginaComponent implements OnInit {


  imagen: any = "link de imagen";
  baseUrl: string = baserUrl;

  quienes_somos_parrU = 'Fundación BINARA es una persona jurídica de derecho privado, sin fines de lucro, con'
  + 'patrimonio propio, administración autónoma, constituida en 2022 ante el Ministerio'
  + 'de Agua, Ambiente y Transición Ecológica del Ecuador.'
quienes_somos_parrD = 'En alianza con empresas privadas, donantes particulares, agencias de cooperación y'
  + 'gobiernos nacionales y locales potenciamos el trabajo de organizaciones sin fines de'
  + 'lucro; micro, pequeñas y medianas empresas; fondos de agua; redes, asociaciones y'
  + 'cooperativas de la economía popular y solidaria; pequeños y medianos productores'
  + 'agrícolas; organizaciones indígenas; y, colectivos urbanos mediante la canalización de'
  + 'recursos monetarios y no monetarios para proteger, conservar y restaurar ecosistemas'
  + 'y servicios ecosistémicos clave para las poblaciones que dependen de ellos.';

  aboutUs?: any;
  mission?: any;
  vision?: any;

  parametersInfo: any = {};

  imageng?: File;

  colaborators?: Parametro[];

  parametro: Parametropost = new Parametropost();


  constructor(private router: Router, private parametroServicio: ParametrosService,
    private dialog: MatDialog, public storageServ: StorageService) { }

  ngOnInit() {
    this.getAboutUs();
    this.getMission();
    this.getVision();
    this.getColaborators();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(InfoDialogComponent, {
      width: '800px', // Configura el ancho según tus necesidades
      height: '90vh',
      data: { info: this.parametersInfo } // Pasa el objeto user al diálogo
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El diálogo se cerró', result);
      this.getAboutUs();
      this.getMission();
      this.getVision();
    });
  }

  //Previsualizar imagen
  imageSrc: string | ArrayBuffer | null = null;
  onFileSelected(event: any): void {
    const input = event.target;
    this.imageng = event.target.files[0]
    console.log(this.imagen)
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageSrc = e.target.result;
        this.imagen = e.target.result;
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  Guardar() {
    this.parametro.visible = true;
    this.parametro.llave = "colaborator"
    this.parametroServicio.crearpa(this.parametro).subscribe(
      (data: any) => {
        if (this.imageng) {
          this.parametroServicio.guardarImagen(data.parametro._id, this.imageng).subscribe(
            data => {
              console.log("imagen guardada")
            }
          )
        }
      }
    );
  }


  getForm(): void {
    var btnAbrirPopup = document.getElementById('btn-abrir-popup'),
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
      window.close();
    });
  }

  getAboutUs() {
    this.parametroServicio.findByLlave("aboutUs").subscribe(
      (res) => {
        this.aboutUs = res.parametros[0]
        this.parametersInfo.aboutUs = res.parametros[0]
      }
    )
  }

  getMission() {
    this.parametroServicio.findByLlave("mission").subscribe(
      (res) => {
        this.mission = res.parametros[0]
        this.parametersInfo.mission = res.parametros[0]
      }
    )
  }

  getVision() {
    this.parametroServicio.findByLlave("vision").subscribe(
      (res) => {
        this.vision = res.parametros[0]
        this.parametersInfo.vision = res.parametros[0]
      }
    )
  }

  getColaborators() {
    this.parametroServicio.findByLlave("colaborator").subscribe(
      (res) => {
        this.colaborators = res.parametros
      }
    )
  }

  editInfo() { }


}

