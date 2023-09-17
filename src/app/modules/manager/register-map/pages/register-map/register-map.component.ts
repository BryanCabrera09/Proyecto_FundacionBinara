import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Mapas } from 'src/app/core/models/mapas';
import { Proyectos } from 'src/app/core/models/proyectos';
import { MapasService } from 'src/app/core/services/mapas.service';
import { ProyectosService } from 'src/app/core/services/proyectos.service';
import Swal from 'sweetalert2';


declare var google: any;


@Component({
  selector: 'app-register-map',
  templateUrl: './register-map.component.html',
  styleUrls: ['./register-map.component.css']
})
export class RegisterMapComponent {
  mapapost: Mapas = new Mapas();
  proyecto: Proyectos= new Proyectos;

 constructor(private dialogRef: MatDialogRef<RegisterMapComponent>,private proyectoService: ProyectosService, private mapaService: MapasService,@Inject(MAT_DIALOG_DATA) public data: any){
  if (data.proyecto != null) {
    console.log(data);
    this.proyecto=data.proyecto;
  }
 }

 onClose(): void {
  this.dialogRef.close();
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
      let m: Mapas = response.mapa;
      

      const ids: string[] = this.proyecto.mapas!.map(mapa => mapa._id as string);
  ids.push(m._id!)

this.crearmapa(ids);
      
    },
    (error) => {
      console.error('Error al registrar el mapa', error);
    }
  );
  
}

crearmapa(ids:string[] ) {
  
  console.log(ids);
  this.proyectoService.editarmapa(ids,this.proyecto.uid+"").subscribe({
    next: response => {
      console.log('Respuesta recibida', response);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: '<strong>Ubicacion registrada con éxito</strong>',
        showConfirmButton: false,
        timer: 2000
      });
      window.location.reload();

    },
    error: error => {
      console.error('Error enviando datos', error);
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: '<strong>Error al registrar ubicación</strong>',
        showConfirmButton: false,
        timer: 1500
      });
    },
    complete: () => {
      console.log('Completado');
    }
  });
  
}

}
