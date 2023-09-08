import { Component, ElementRef, ViewChild } from '@angular/core';
import { Proyectos } from 'src/app/core/models/proyectos';
import { ProyectosService } from 'src/app/core/services/proyectos.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { RegisterActivityComponent } from 'src/app/modules/manager/register-activity/pages/register-activity/register-activity.component';
import { MatDialog } from '@angular/material/dialog';
import { Proyectospost } from 'src/app/core/models/proyectospost';
import { Mapas } from 'src/app/core/models/mapas';

declare var google: any;

@Component({
  selector: 'app-ver-proyecto',
  templateUrl: './ver-proyecto.component.html',
  styleUrls: ['./ver-proyecto.component.css'],
  providers: [DatePipe]
})
export class VerProyectoComponent {
  proyecto!: Proyectos;


  constructor(private dialog: MatDialog, private route: ActivatedRoute,private proyectosService: ProyectosService){}
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
   
    this.buscarProyectoPorId(id!);

    
  }

  buscarProyectoPorId(id: String): void {
    this.proyectosService.searchProject(id).subscribe({
      next: (data: any) => {
        this.proyecto = data.proyecto;
        console.log(this.proyecto);
      },
      error: error => {
        console.error('Error obteniendo el proyecto:', error);
      }
    });
    
    
  }
  getProvincia(lugar: any): string {
    return lugar.split(';')[2];
  }

  @ViewChild('mapContainer', { static: false }) gmap!: ElementRef;
  map: any;

  

  mapOptions: any;

  ngAfterViewInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.buscarProyectoPorId(id!);
   
    setTimeout(() => {
      this.mapInitializer();
    }, 2000); 
  }

  mapInitializer() {
    // Aseguramos que 'proyecto' y 'mapas' están definidos y obtenemos las coordenadas
    if (this.proyecto && this.proyecto.mapas && this.proyecto.mapas[0] && 
        typeof this.proyecto.mapas[0].coorX === 'string' && 
        typeof this.proyecto.mapas[0].coorY === 'string') {
        
        const coorX = parseFloat(this.proyecto.mapas[0].coorX); 
        const coorY = parseFloat(this.proyecto.mapas[0].coorY);

        this.mapOptions = {
            center: { lat: coorX, lng: coorY },
            zoom: 20
        };

        this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);
    } else {
        console.error("Datos del proyecto o mapas no disponibles o en formato incorrecto");
    }
}
abrirRegistrodeactividad(idProyecto: number) {
  this.dialog.open(RegisterActivityComponent, {
    width: '800px',
    hasBackdrop: false,
    height: '600px',
    data: { proyectoId: idProyecto}
  });
}

mapasArray: Mapas[] = [
  {
    _id: 'id invalido',
    lugar: 'Lugar 1',
    coorX: '-30.232545',
    coorY: '-179.78456'
  }
];

actividades = [
  {
    _id: 1,
    titulo: "Plantación de Árboles",
    descripcion: "Plantar árboles en varias áreas para promover la reforestación",
    mapa: this.mapasArray[0],
    usuario: {
      // Tus datos de usuario aquí
    },
    proyecto: {
      // Tus datos de proyecto aquí
    },
    num_areas: 3,
    num_personas_beneficiarias: 100,
    num_mujeres_beneficiarias: 50,
    num_niños_niñas_beneficiarias: 30,
    num_adoloscentes_beneficiarios: 10,
    num_adultos_beneficiarios: 60,
    visible: true
  },
  {
    _id: 2,
    titulo: "Talleres de Educación Ambiental",
    descripcion: "Talleres para educar a la comunidad sobre prácticas amigables con el medio ambiente",
    mapa: [
      // Tus datos de mapas aquí
    ],
    usuario: {
      // Tus datos de usuario aquí
    },
    proyecto: {
      // Tus datos de proyecto aquí
    },
    num_areas: 2,
    num_personas_beneficiarias: 80,
    num_mujeres_beneficiarias: 40,
    num_ninos_ninas_beneficiarias: 20,
    num_adoloscentes_beneficiarios: 20,
    num_adultos_beneficiarios: 40,
    visible: true
  },
  {
    _id: 3,
    titulo: "Construcción de Pozos de Agua",
    descripcion: "Proyecto para la construcción de pozos de agua en áreas con escasez de agua",
    mapa: [
      // Tus datos de mapas aquí
    ],
    usuario: {
      // Tus datos de usuario aquí
    },
    proyecto: {
      // Tus datos de proyecto aquí
    },
    num_areas: 4,
    num_personas_beneficiarias: 200,
    num_mujeres_beneficiarias: 100,
    num_ninos_ninas_beneficiarias: 70,
    num_adoloscentes_beneficiarios: 30,
    num_adultos_beneficiarios: 100,
    visible: true
  },
  {
    _id: 4,
    titulo: "Cursos de Alfabetización Digital",
    descripcion: "Cursos para enseñar a las personas de la comunidad sobre tecnologías digitales básicas",
    mapa: [
      // Tus datos de mapas aquí
    ],
    usuario: {
      // Tus datos de usuario aquí
    },
    proyecto: {
      // Tus datos de proyecto aquí
    },
    num_areas: 3,
    num_personas_beneficiarias: 150,
    num_mujeres_beneficiarias: 75,
    num_ninos_ninas_beneficiarias: 40,
    num_adoloscentes_beneficiarios: 40,
    num_adultos_beneficiarios: 70,
    visible: true
  },
  {
    _id: 5,
    titulo: "Programa de Nutrición Comunitaria",
    descripcion: "Programa para promover la nutrición saludable y proveer alimentos a las comunidades necesitadas",
    mapa: [
      // Tus datos de mapas aquí
    ],
    usuario: {
      // Tus datos de usuario aquí
    },
    proyecto: {
      // Tus datos de proyecto aquí
    },
    num_areas: 5,
    num_personas_beneficiarias: 300,
    num_mujeres_beneficiarias: 150,
    num_ninos_ninas_beneficiarias: 100,
    num_adoloscentes_beneficiarios: 50,
    num_adultos_beneficiarios: 150,
    visible: true
  }
];



detallesVisibles = new Set<number>();

toggleDetalle(id: number) {
  if (this.detallesVisibles.has(id)) {
    this.detallesVisibles.delete(id);
  } else {
    this.detallesVisibles.add(id);
  }
}



}
