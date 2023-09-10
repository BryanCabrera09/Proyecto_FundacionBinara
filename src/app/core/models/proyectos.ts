import { Mapas } from "./mapas";

export class Proyectos {

    uid?: number;
    titulo?: string;
    objetivoPrincipal?: string;
    objetivosSecundarios?: string[];
    mapas?: Mapas[];
    parrafoUno?: string;
    parrafoDos?: string;
    parrafoTres?: string;
    portada?: any;
    presupuesto?: number;
    recolectado?: number;
    fechaInicio?: Date;
    fechaFin?: Date;
    visible?: boolean;
}
