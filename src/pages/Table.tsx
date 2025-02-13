import { useState } from "react";
import Filters from "../components/Filter";
import ProgressTable from "../components/tables/Progressivo";
import useProgresso from "../hooks/useProgress";
import InputTable from "../components/tables/Input";

export const Table = () => {
  //   const [sector, setSector] = useState<Sector[]>([]);
  //   const [area, setArea] = useState<Area[]>([]);
  //   const [progresso, setProgresso] = useState<Progresso[]>([]);
  //   const [loading, setLoading] = useState(true);
  const [selectedSector, setSelectedSector] = useState<string>("Todos");
  const [selectedArea, setSelectedArea] = useState<string>("Todos");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const { areas, progresso, loading, sectors, analytics } = useProgresso();
  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const [sectorRes, areaRes, progressoRes] = await Promise.all([
  //           api.get("/sectors/all/de190ded-d23c-410c-89ac-89faf4dfb36a"),
  //           api.get("/areas"),
  //           api.get(
  //             "/last-week/de190ded-d23c-410c-89ac-89faf4dfb36a?=&_limit=10"
  //           ),
  //         ]);

  //         setSector(sectorRes.data.data.data);
  //         setArea(areaRes.data.data);
  //         setProgresso(progressoRes.data.data.technicians);
  //       } catch (error) {
  //         console.error("Erro ao buscar dados:", error);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };

  //     fetchData();
  //   }, []);

  const filteredProgresso = progresso.filter(
    (item) =>
      (selectedSector === "Todos" || "item.sector" === selectedSector) &&
      (selectedArea === "Todos" || "item.area_name" === selectedArea)
    //    &&
    //   item.technician_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full px-6 bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-bold text-sky-600 text-center mb-6">
          Análises - Progresso
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
          input={analytics}
          progresso={filteredProgresso}
        />
      </div>
    </div>
  );
};
