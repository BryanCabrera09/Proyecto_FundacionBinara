import { Component, ElementRef, ViewChild, Inject } from '@angular/core';
import { Mapas } from 'src/app/core/models/mapas';
import { MapasService } from 'src/app/core/services/mapas.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Actividades } from 'src/app/core/models/actividades';
import { ActividadesService } from 'src/app/core/services/actividades.service';
import { Proyectospost } from 'src/app/core/models/proyectospost';
import { ProyectosService } from 'src/app/core/services/proyectos.service';
import swal from 'sweetalert2';

declare var google: any;

@Component({
  selector: 'app-register-activity',
  templateUrl: './register-activity.component.html',
  styleUrls: ['./register-activity.component.css']
})
export class RegisterActivityComponent {

  titulo: string = '';
  descripcion: string = '';
  mapasArray: Mapas[] = [
    {
      _id: '64fcb359b8344e8a47b3620d',
      lugar: 'AZUAY;SANTA ISABEWL;CUENCA',
      coorX: '-30.232545',
      coorY: '-179.78456'
    }
  ];


  num_areas: number = 0;
  num_personas_beneficiarias: number = 0;
  num_mujeres_beneficiarias: number = 0;
  num_ninos_ninas_beneficiarias: number = 0;
  num_adolescentes_beneficiarios: number = 0;
  num_adultos_beneficiarios: number = 0;
  visible: boolean = true;
  proyectoedit: any;

  actividad: Actividades = new Actividades();
  mapapost: Mapas = new Mapas();
  proyectoId: string;
  edit: boolean = false;
  camposFaltantes: string[] = [];
  constructor(private dialogRef: MatDialogRef<RegisterActivityComponent>, @Inject(MAT_DIALOG_DATA) private data: any, private route: ActivatedRoute, private proyectosService: ProyectosService, private mapaService: MapasService, private actividadesService: ActividadesService) {
    this.proyectoId = data.proyectoId;
    if(data.actividad != null){
      this.proyectoedit = data.actividad;
      this.edit = data.editing;
      this.titulo = data.actividad.titulo;
      this.descripcion = data.actividad.descripcion;
      this.lat = data.actividad.coorX;
      this.lng = data.actividad.coorY;
      this.num_areas=data.actividad.num_areas;
      this.num_personas_beneficiarias=data.actividad.num_personas_beneficiarias;
      this.num_mujeres_beneficiarias=data.actividad.num_mujeres_beneficiarias;
      this.num_ninos_ninas_beneficiarias=data.actividad.num_niños_niñas_beneficiarias;
      this.num_adolescentes_beneficiarios=data.actividad.num_adoloscentes_beneficiarios;
      this.num_adultos_beneficiarios=data.actividad.num_adultos_beneficiarios;

      
      console.log(data.actividad)
    }
  }
  onClose(): void {
    this.dialogRef.close();

  }
  ngOnInit(): void {
    
    if (this.proyectoId) {
      this.obtenerDetallesDelProyecto(this.proyectoId);
      
    }
  }


  obtenerDetallesDelProyecto(proyectoId: string) {
    this.proyectosService.searchProject(proyectoId).subscribe({
      next: (data: any) => {
        console.log(data.proyecto);
        let proyecto = new Proyectospost();
        proyecto.id = data.proyecto._id;

        this.actividad.proyecto = proyectoId;
        console.log(this.proyectoId)
      },
      error: error => {
        console.error('Error obteniendo el proyecto:', error);
      }
    });
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
    this.validacion();
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

  Datos(): void {
    this.actividad.titulo = this.titulo;
    this.actividad.descripcion = this.descripcion;
    this.actividad.num_areas = this.num_areas;
    this.actividad.num_personas_beneficiarias = this.num_personas_beneficiarias;
    this.actividad.num_mujeres_beneficiarias = this.num_mujeres_beneficiarias;
    this.actividad.num_niños_niñas_beneficiarias = this.num_ninos_ninas_beneficiarias;
    this.actividad.num_adoloscentes_beneficiarios = this.num_adolescentes_beneficiarios;
    this.actividad.num_adultos_beneficiarios = this.num_adultos_beneficiarios;
    this.actividad.visible = this.visible;
    const userDetailsJSON = window.sessionStorage.getItem("userdetails");
const userDetailsObj = JSON.parse(userDetailsJSON!);
const uid = userDetailsObj.uid;
console.log(uid);

    this.actividad.usuario = uid;
  }

  Register(id: Mapas[]) {

    console.log(id[0]._id);
    this.Datos();
    this.actividad.mapa = id[0]._id;
    this.actividadesService.createActivity(this.actividad).subscribe(
      (response) => {
        console.log('Actividad registrado con éxito', response);
        this.onClose();
        swal.fire({
          position: 'center',
          icon: 'success',
          title: '<strong>Actividad registrado exitosamente</strong>',
          showConfirmButton: false,
          timer: 1500
        });
        setTimeout(() => {
          location.reload();
        }, 1000);
      },
      (error) => {
        console.error('Error al registrar la Actividad', error);
        console.log(this.actividad)
        swal.fire({
          position: 'center',
          icon: 'error',
          title: '<strong>Error al registrar Actividad</strong>',
          showConfirmButton: false,
          timer: 1500
        });
      }
    );
  }
  Editar(id: Mapas[]) {
    console.log("editar " + id[0].lugar);
    this.Datos();
    this.actividad.mapa = id[0]._id;
    this.actividadesService.editActivity(this.proyectoedit._id, this.actividad).subscribe({
      next: response => {
        console.log('Actividad actualizado con éxito!', response);
        this.onClose();
        swal.fire({
          position: 'center',
          icon: 'success',
          title: '<strong>Actividad actualizado con éxito!</strong>',
          showConfirmButton: false,
          timer: 1500
        });
      },
      error: error => {
        console.error('Error al actualizar la actividad:', error);
        console.log(this.proyectoedit._id+"idddddd")
        swal.fire({
          position: 'center',
          icon: 'error',
          title: '<strong>Error al actualizar la actividad</strong>'+error,
          showConfirmButton: false,
          timer: 1500
        });
      },
      complete: () => {
        console.log('La operación ha completado');
      }
    });
  }
  
  validacion(): void {
    this.camposFaltantes = [];
    if (!this.titulo) {
      this.camposFaltantes.push('Título');
    }
    if (!this.descripcion) {
      this.camposFaltantes.push('Descripción');
    }
    if (!this.provincia) {
      this.camposFaltantes.push('Seleccionar el Lugar');
    }
    if (this.camposFaltantes.length > 0) {
      swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Por favor, completa los siguientes campos obligatorios: ' + this.camposFaltantes.join(',\n '),
        showConfirmButton: false,
        timer: 4000
      });
      return; 
    }}
}
