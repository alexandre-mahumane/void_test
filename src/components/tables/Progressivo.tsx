import { Progresso } from "../../interfaces/interface";

interface ProgressTableProps {
  loading: boolean;
  progresso: Progresso[];
}

export const ProgressTable: React.FC<ProgressTableProps> = ({
  loading,
  progresso,
}) => {
  return loading ? (
    <p className="text-center text-gray-500">Carregando dados...</p>
  ) : (
    <div className="overflow-y-auto max-h-96">
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead className="bg-sky-500 text-white sticky top-0">
          <tr>
            <th className="p-4 text-left">Setor</th>
            <th className="p-4 text-left">Area</th>
            <th className="p-4 text-left">Tecnico</th>
            {progresso.length > 0 &&
              progresso[0].weeks.map((_, index) => (
                <th key={index} className="p-4 text-left">
                  Semana {index + 1}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {progresso.map((item) => {
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
        </tbody>
      </table>
    </div>
  );
};
