import { useEffect, useState } from "react";
import { api } from "../api/Api";

interface WeekData {
  week_start: string;
  total_records: number;
}
interface Sector {
  id: string;
  name: string;
}

interface Area {
  id: string;
  name: string;
}

interface Progresso {
  id: string;
  sector: string;
  area_name: string;
  technician_name: string;
  weeks: WeekData[];
}

export const Table = () => {
  const [sector, setSector] = useState<Sector[]>([]);
  const [area, setArea] = useState<Area[]>([]);
  const [progresso, setProgresso] = useState<Progresso[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedSector, setSelectedSector] = useState<string>("Todos");
  const [selectedArea, setSelectedArea] = useState<string>("Todos");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const fetchData = async () => {
    try {
      const [sectorRes, areaRes, progressoRes] = await Promise.all([
        api.get("/sectors/all/de190ded-d23c-410c-89ac-89faf4dfb36a"),
        api.get("/areas"),
        api.get("/last-week/de190ded-d23c-410c-89ac-89faf4dfb36a?=&_limit=10"),
      ]);

      console.log("progresso:  ", progressoRes.data.data);
      console.log("sector:  ", sectorRes.data.data);
      console.log("area:  ", areaRes.data.data);

      setSector(sectorRes.data.data.data);
      setArea(areaRes.data.data);
      setProgresso(progressoRes.data.data.technicians);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredProgresso = progresso.filter(
    (item) =>
      (selectedSector === "Todos" || item.sector === selectedSector) &&
      (selectedArea === "Todos" || item.area_name === selectedArea)
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full px-6 bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-bold text-sky-600 text-center mb-6">
          Análises - Progresso
        </h2>

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
            <option value="Todos">Selecionar a Área</option>
            {area.map((a) => (
              <option key={a.id} value={a.name}>
                {a.name}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Carregando dados...</p>
        ) : (
          <div className="overflow-y-auto max-h-96">
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead className="bg-sky-500 text-white sticky top-0">
                <tr>
                  <th className="p-4 text-left">Setor</th>
                  <th className="p-4 text-left">Área</th>
                  <th className="p-4 text-left">Técnico</th>
                  {filteredProgresso.length > 0 &&
                    filteredProgresso[0].weeks.map((_, index) => (
                      <th key={index} className="p-4 text-left">
                        Semana {index + 1}
                      </th>
                    ))}
                </tr>
              </thead>
              <tbody>
                {filteredProgresso.map((item) => {
                  let acumulado = 0;
                  return (
                    <tr
                      key={item.id}
                      className="hover:bg-gray-100 border-t border-gray-300"
                    >
                      <td className="p-4">{item.sector}</td>
                      <td className="p-4">{item.area_name}</td>
                      <td className="p-4">{item.technician_name}</td>
                      {item.weeks.map((week, index) => {
                        acumulado += week.total_records;
                        return (
                          <td key={index} className="p-4 font-bold">
                            {week.total_records} | {acumulado}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
                <tr className="bg-gray-200 font-bold">
                  <td className="p-4" colSpan={3}>
                    Totais
                  </td>
                  {filteredProgresso.length > 0 &&
                    filteredProgresso[0].weeks.map((_, index) => {
                      let totalAcumulado = 0;
                      return (
                        <td key={index} className="p-4">
                          {filteredProgresso.reduce((sum, item) => {
                            totalAcumulado +=
                              item.weeks[index]?.total_records || 0;
                            return totalAcumulado;
                          }, 0)}
                        </td>
                      );
                    })}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
