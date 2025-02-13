import { Area, Sector } from "../interfaces/interface";

interface FiltersProps {
  sector: Sector[];
  area: Area[];
  selectedSector: string;
  setSelectedSector: (value: string) => void;
  selectedArea: string;
  setSelectedArea: (value: string) => void;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

const Filters: React.FC<FiltersProps> = ({
  sector,
  area,
  selectedSector,
  setSelectedSector,
  selectedArea,
  setSelectedArea,
  searchTerm,
  setSearchTerm,
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
      <input
        type="text"
        placeholder="Pesquisar por técnico..."
        className="w-full md:w-1/3 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select
        className="w-full md:w-1/4 p-3 border border-gray-300 rounded-lg"
        value={selectedSector}
        onChange={(e) => setSelectedSector(e.target.value)}
      >
        <option value="Todos">Selecionar o setor</option>
        {sector.map((s) => (
          <option key={s.id} value={s.name}>
            {s.name}
          </option>
        ))}
      </select>

      <select
        className="w-full md:w-1/4 p-3 border border-gray-300 rounded-lg"
        value={selectedArea}
        onChange={(e) => setSelectedArea(e.target.value)}
      >
        <option value="Todos">Selecionar a Area</option>
        {area.map((a) => (
          <option key={a.id} value={a.name}>
            {a.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filters;
