export interface Sector {
  id: string;
  name: string;
}

export interface Area {
  id: string;
  name: string;
}
export interface ProgressTableProps {
  loading: boolean;
  analytics: string[];
  progresso: Progresso[];
}
export interface Week {
  total_records: number;
}

export interface Progresso {
  id: string;
  sector: string;
  area_name: string;
  technician_name: string;
  weeks: Week[];
}
export interface Input {
  id: string;
  inputsColumns: [];
  sector: string;
  area_name: string;
  technician_name: string;
  weeks: Week[];
}

export interface ProgressoState {
  sectors: Sector[];
  areas: Area[];
  progresso: Progresso[];
  analytics: any[];
  loading: boolean;
  error: string | null;
}
