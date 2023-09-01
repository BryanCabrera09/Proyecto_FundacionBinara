import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Proyectos } from 'src/app/core/models/proyectos';
import { ProyectosService } from 'src/app/core/services/proyectos.service';
import { Mapas } from 'src/app/core/models/mapas';
import { Proyectospost } from 'src/app/core/models/proyectospost';
import { MapasService } from 'src/app/core/services/mapas.service';

declare var google: any;

@Component({
  selector: 'app-register-project',
  templateUrl: './register-project.component.html',
  styleUrls: ['./register-project.component.css']
})
export class RegisterProjectComponent {

  titulo: string = '';
  objetivoPrincipal: string = '';
  objetivosSecundarios: string[] = [''];
  parrafoUno: string = '';
  parrafoDos: string = '';
  parrafoTres: string = '';
  portada: any = "URL_de_la_portada_del_nuevo_proyecto";
  presupuesto: number = 0;
  recolectado: number = 0;
  fechaInicio: Date = new Date("2023-09-01T00:00:00.000Z");
  fechaFin: Date = new Date("2023-09-11T00:00:00.000Z");

  mapasArray: Mapas[] = [
    {
      _id: 'id invalido',
      lugar: 'Lugar 1',
      coorX: '-30.232545',
      coorY: '-179.78456'
    }
  ];

  visible: boolean = true;

  proyecto: Proyectospost = new Proyectospost();
  mapapost: Mapas = new Mapas();

  constructor(private dialogRef: MatDialogRef<RegisterProjectComponent>, private proyectoService: ProyectosService,private mapaService:MapasService) { }

  Solonumero(event: any) {
    const input = event.target as HTMLInputElement;
    let value = input.value;
    value = value.replace(/[^0-9.]/g, '');
    const decimalCount = value.split('.').length - 1;
    if (decimalCount > 1) {
      value = value.replace(/\.+$/, '');
    }
    input.value = value;
  }

  onClose(): void {
    this.dialogRef.close();
  }

  imagePreviewSrc: string | ArrayBuffer | null = null;

  showPreview(event: any): void {
    const input = event.target;
    if (input.files && input.files[0]) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.imagePreviewSrc = e.target.result;
        console.log(e.target.result)
        this.portada = e.target.result;
      };

      reader.readAsDataURL(input.files[0]);
    }
  }


  //Mapa
  @ViewChild('mapContainer', { static: false }) gmap!: ElementRef;
  map: any;

  searchBox: any;

  lat!: number;
  lng!: number;
  currentMarker: any;

  geocoder: any;
  provincia: string = "";
  canton: string = "";
  parroquia: string = "";

  mapOptions: any = {
    center: { lat: -2.9007928, lng: -78.9999998 },
    zoom: 15
  };

  ngAfterViewInit() {
    this.mapInitializer();
  }

  mapInitializer() {
    this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);
    this.geocoder = new google.maps.Geocoder();



    // Agrega un escucha para el evento 'click' del mapa
    this.map.addListener('click', (event: { latLng: { lat: () => number; lng: () => number; }; }) => {
      this.handleMapClick(event);
    });

    // Inicializa el cuadro de búsqueda y lo asocia con el input de búsqueda
    const input = document.getElementById("search") as HTMLInputElement;
    this.searchBox = new google.maps.places.SearchBox(input);
    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // Escucha el evento de selección del lugar
    this.searchBox.addListener("places_changed", () => {
      const places = this.searchBox.getPlaces();
      console.log(places);

      if (places.length == 0) {
        return;
      }

      // Para cada lugar, obtiene el icono, el nombre y la ubicación
      const bounds = new google.maps.LatLngBounds();
      places.forEach((place: { geometry: { location: any; viewport: any; }; }) => {
        if (!place.geometry) {
          console.log("Returned place contains no geometry");
          return;
        }

        // Captura las coordenadas y las almacena en las propiedades del componente
        const location = place.geometry.location;
        this.lat = location.lat();
        this.lng = location.lng();

        // Actualiza el mapa con la ubicación seleccionada
        if (place.geometry.viewport) {
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      this.map.fitBounds(bounds);
    });
  }

  handleMapClick(event: { latLng: any; }) {
    // Si hay un marcador previo, lo elimina
    if (this.currentMarker) {
      this.currentMarker.setMap(null);
    }

    // Actualiza las coordenadas con la posición donde el usuario hizo clic
    this.lat = event.latLng.lat();
    this.lng = event.latLng.lng();

    // Añade un nuevo marcador y guarda una referencia a él
    this.currentMarker = new google.maps.Marker({
      position: event.latLng,
      map: this.map
    });

    //provincia-canton-parroquia
    this.geocoder.geocode({ 'location': event.latLng }, (results: { address_components: any; }[], status: string) => {
      if (status === 'OK' && results[0]) {
        // Procesa los resultados para obtener los detalles deseados
        for (let component of results[0].address_components) {
          const componentType = component.types;

          if (componentType.includes("administrative_area_level_1")) {
            // Provincia
            this.provincia = component.long_name;
          } else if (componentType.includes("administrative_area_level_2")) {
            // Cantón
            this.canton = component.long_name;
          } else if (componentType.includes("sublocality_level_1")) {
            // Parroquia (esto puede variar dependiendo del país y la forma en que Google Maps organiza los datos)
            this.parroquia = component.long_name;
          }
        }
      } else {
        console.error('Error en geocodificación inversa', status);
      }
    });
    //HASTA AQUI TODOS LOS METODOS ESTAN RELACIONADO CON EL MAPA




  }

  Register(id: Mapas[]) {

    this.mapasArray=id;
    const mapasIds = this.mapasArray.map(mapa => mapa._id!);
    console.log(id);
    
    this.proyecto.titulo = this.titulo;
    this.proyecto.objetivoPrincipal = this.objetivoPrincipal;
    this.proyecto.objetivosSecundarios = this.objetivosSecundarios;
    this.proyecto.parrafoUno = this.parrafoUno;
    this.proyecto.parrafoDos = this.parrafoDos;
    this.proyecto.parrafoTres = this.parrafoTres;
    this.proyecto.presupuesto = this.presupuesto;
    this.proyecto.recolectado = this.recolectado;
    this.proyecto.portada = this.portada;
    this.proyecto.visible = this.visible;
    this.proyecto.fechaInicio = this.fechaInicio;
    this.proyecto.fechaFin = this.fechaFin;
    this.proyecto.mapas = mapasIds;
    console.log(this.proyecto)

    this.proyectoService.createProject(this.proyecto).subscribe(
      (response) => {
        console.log('Proyecto registrado con éxito', response);
        this.onClose();
        window.location.reload();

      },
      (error) => {
        console.error('Error al registrar el proyecto', error);
        console.log(this.proyecto.portada)
      }
    );
}

 GuardarMapa(){
  
this.mapapost.lugar =this.provincia+";"+this.canton+";"+this.parroquia;
this.mapapost.coorX = this.lat+"";
this.mapapost.coorY = this.lng+"";

  
    this.mapaService.createMap(this.mapapost).subscribe(
      (response: any) => {
        console.log('Mapa registrado con éxito', response.mapa);
        let m: Mapas[]=[response.mapa];
        this.Register(m);
      
        
      },
      (error) => {
        console.error('Error al registrar el mapa', error);
      }
    );
  
 }

 agregarObjetivo() {
  this.objetivosSecundarios.push('');
}

eliminarObjetivo(index: number) {
  if (this.objetivosSecundarios.length > 1) {
    this.objetivosSecundarios.splice(index, 1);
  }
}
trackByIndex(index: number, item: any): number {
  return index;
}



}
