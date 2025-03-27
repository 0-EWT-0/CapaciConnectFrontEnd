export interface WorkshopType {
  id_type: number;
  type_name: string;
  created_at?: string;
  updated_at?: string;
}

export interface WorkshopTypeDTO {
  type_name: string;  // Campo requerido (como indica el asterisco)
}
