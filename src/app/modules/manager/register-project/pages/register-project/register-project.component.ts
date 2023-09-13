import { Component, ElementRef, ViewChild, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProyectosService } from 'src/app/core/services/proyectos.service';
import { Mapas } from 'src/app/core/models/mapas';
import { Proyectospost } from 'src/app/core/models/proyectospost';
import { MapasService } from 'src/app/core/services/mapas.service';
import Swal from 'sweetalert2';


declare var google: any;

@Component({
  selector: 'app-register-project',
  templateUrl: './register-project.component.html',
  styleUrls: ['./register-project.component.css']
})
export class RegisterProjectComponent {
  //Declaración de datos
  titulo: string = '';
  objetivoPrincipal: string = '';
  objetivosSecundarios: string[] = [''];
  parrafoUno: string = '';
  parrafoDos: string = '';
  parrafoTres: string = '';
  portada: any = "URL_de_la_portada_del_nuevo_proyecto";
  presupuesto: number = 0;
  recolectado: number = 0;
  fechaInicio: Date = new Date("2023-09-11T00");
  fechaFin: Date = new Date("2023-09-11T00");
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
  proyectoedit: any;
  edit: boolean = false;

  constructor(private dialogRef: MatDialogRef<RegisterProjectComponent>, private proyectoService: ProyectosService, private mapaService: MapasService, @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data.proyecto != null) {
      this.proyectoedit = data.proyecto;
      this.edit = data.editing;
      this.titulo = data.proyecto.titulo;
      this.objetivoPrincipal = data.proyecto.objetivoPrincipal;
      this.objetivosSecundarios = data.proyecto.objetivosSecundarios;
      this.lat = data.proyecto.mapas[0].coorX;
      this.lng = data.proyecto.mapas[0].coorY;
      this.provincia = data.proyecto.mapas[0].lugar.split(';')[0];
      this.canton = data.proyecto.mapas[0].lugar.split(';')[1];
      this.parroquia = data.proyecto.mapas[0].lugar.split(';')[2];
      this.parrafoUno = data.proyecto.parrafoUno;
      this.parrafoDos = data.proyecto.parrafoDos;
      this.parrafoTres = data.proyecto.parrafoTres;
      this.portada = data.proyecto.portada;
      this.imagePreviewSrc = data.proyecto.portada;
      this.presupuesto = data.proyecto.presupuesto;
      this.recolectado = data.proyecto.recolectado;
      this.fechaInicio = data.proyecto.fechaInicio;
      this.fechaFin = data.proyecto.fechaFin;
    }

  }

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
  //Visualizar img
  imagePreviewSrc: string | ArrayBuffer | null = null;
  showPreview(event: any): void {
    const input = event.target;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreviewSrc = e.target.result;
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
    this.map.addListener('click', (event: { latLng: { lat: () => number; lng: () => number; }; }) => {
      this.handleMapClick(event);
    });
    const input = document.getElementById("search") as HTMLInputElement;
    this.searchBox = new google.maps.places.SearchBox(input);
    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
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
    this.currentMarker = new google.maps.Marker({
      position: event.latLng,
      map: this.map
    });
    //provincia-canton-parroquia
    this.geocoder.geocode({ 'location': event.latLng }, (results: { address_components: any; }[], status: string) => {
      if (status === 'OK' && results[0]) {
        for (let component of results[0].address_components) {// Procesa los resultados para obtener los detalles deseados
          const componentType = component.types;
          if (componentType.includes("administrative_area_level_1")) {
            this.provincia = component.long_name;// Provincia
          } else if (componentType.includes("administrative_area_level_2")) {
            this.canton = component.long_name;// Cantón
          } else if (componentType.includes("sublocality_level_1")) {
            this.parroquia = component.long_name; // Parroquia (esto puede variar dependiendo del país y la forma en que Google Maps organiza los datos)
          }
        }
      } else {
        console.error('Error en geocodificación inversa', status);
      }
    });
  }

  GuardarMapa() {
    this.mapapost.lugar = this.provincia + ";" + this.canton + ";" + this.parroquia;
    this.mapapost.coorX = this.lat + "";
    this.mapapost.coorY = this.lng + "";
    this.mapaService.createMap(this.mapapost).subscribe(
      (response: any) => {
        console.log('Mapa registrado con éxito', response.mapa);
        let m: Mapas[] = [response.mapa];
        if (this.edit) {
          this, this.Editar(m);
        } else {
          this.Register(m);
        }
      },
      (error) => {
        console.error('Error al registrar el mapa', error);
      }
    );
  }

  Datos(): void {
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
  }

  Editar(mapa: Mapas[]) {
    console.log("editar " + mapa[0].lugar);
    this.mapasArray = mapa;
    const mapasIds = this.mapasArray.map(mapa => mapa._id!);
    this.Datos();
    this.proyecto.mapas = mapasIds;
    this.proyectoService.editProject(this.proyectoedit._id, this.proyecto).subscribe({
      next: response => {
        console.log('Proyecto actualizado con éxito!', response);
        this.onClose();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '<strong>Proyecto actualizado con éxito!</strong>',
          showConfirmButton: false,
          timer: 1500
        });
      },
      error: error => {
        console.error('Error al actualizar el proyecto:', error);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: '<strong>Error al actualizar el proyecto</strong>'+error,
          showConfirmButton: false,
          timer: 1500
        });
      },
      complete: () => {
        console.log('La operación ha completado');
      }
    });
  }

  Register(id: Mapas[]) {
    this.mapasArray = id;
    const mapasIds = this.mapasArray.map(mapa => mapa._id!);
    console.log(id);
    this.Datos();
    this.proyecto.mapas = mapasIds;
    this.proyectoService.createProject(this.proyecto).subscribe(
      (response) => {
        console.log('Proyecto registrado con éxito', response);
        this.onClose();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '<strong>Proyecto registrado con éxito</strong>',
          showConfirmButton: false,
          timer: 1500
        });
      },
      (error) => {
        console.error('Error al registrar el proyecto', error);
        console.log(this.proyecto.portada)
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: '<strong>Error al registrar proyecto</strong>',
          showConfirmButton: false,
          timer: 1500
        });
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
  trackByIndex(index: number): number {
    return index;
  }
}
