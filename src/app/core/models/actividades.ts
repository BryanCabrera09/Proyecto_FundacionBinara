import { Proyectos } from "./proyectos";
import { Mapas } from "./mapas";
import { Usuario } from "./usuario";

export class Actividades {
    _id?: number;
    titulo?: string;
    descripcion?: string;
    mapa?: Mapas[];
    usuario?: Usuario;
    proyecto?: Proyectos;
    num_areas?: number;
    num_personas_beneficiarias?: number;
    num_mujeres_beneficiarias?: number;
    num_niños_niñas_beneficiarias?: number;
    num_adoloscentes_beneficiarios?: number;
    num_adultos_beneficiarios?: number;
    visible?: boolean;
}
