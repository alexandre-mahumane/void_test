import { useState } from "react";

import useProgresso from "../hooks/useProgress";
import { InputTable } from "../components/tables/Input";
import { Filters } from "../components/Filter";
import { ProgressTable } from "../components/tables/Progressivo";

export const Table = () => {
  const [selectedSector, setSelectedSector] = useState<string>("Todos");
  const [selectedArea, setSelectedArea] = useState<string>("Todos");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const { areas, progresso, loading, sectors, analytics } = useProgresso();

  console.log(analytics);
  const filteredProgresso = progresso.filter(
    (item) =>
      (selectedSector === "Todos" || item.sector === selectedSector) &&
      (selectedArea === "Todos" || item.area_name === selectedArea) &&
      item.technician_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex space-y-28 flex-col items-center justify-center min-h-screen">
      <div className="w-full px-6 bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-bold text-sky-600 text-center mb-6">
          Analises - Progresso
        </h2>
        <Filters
          sector={sectors}
          area={areas}
          selectedSector={selectedSector}
          setSelectedSector={setSelectedSector}
          selectedArea={selectedArea}
          setSelectedArea={setSelectedArea}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <ProgressTable loading={loading} progresso={filteredProgresso} />
      </div>

      <div className="w-full px-6 bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-bold text-sky-600 text-center mb-6">
          Insumo
        </h2>
        <Filters
          sector={sectors}
          area={areas}
          selectedSector={selectedSector}
          setSelectedSector={setSelectedSector}
          selectedArea={selectedArea}
          setSelectedArea={setSelectedArea}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <InputTable
          loading={loading}
          analytics={analytics}
          progresso={filteredProgresso}
        />
      </div>
    </div>
  );
};
