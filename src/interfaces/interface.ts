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
  input: Input[];
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
  sector: string;
  area_name: string;
  technician_name: string;
  weeks: Week[];
}
