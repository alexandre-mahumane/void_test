import { ProgressTableProps } from "../../interfaces/interface";

export const InputTable: React.FC<ProgressTableProps> = ({
  loading,
  analytics,
  progresso,
}) => {
  console.log("Input Data:", analytics);

  return loading ? (
    <p className="text-center text-gray-500">Carregando dados...</p>
  ) : (
    <div className="overflow-y-auto max-h-96">
      <table className=" min-w-screen border-collapse border border-gray-300">
        <thead className="bg-sky-500 min-w-screen text-white sticky top-0">
          <tr>
            <th className="p-4 text-left">Setor</th>
            <th className="p-4 text-left">Area</th>
            <th className="p-4 text-left">Tecnico</th>
            <th className="p-4 text-left">Produtores</th>

            <div className="flex flex-full">
              <div className="w-full ">
                <th className="p-4 ">Semente X</th>
                <tr>
                  <th className="px-4 py-2">Distribuídos</th>
                  <th className="px-4 py-2">Recebidos</th>
                </tr>
              </div>
              <div className="w-full ">
                <th className="p-4 ">Semente Y</th>
                <tr>
                  <th className="px-4 py-2">Distribuídos</th>
                  <th className="px-4 py-2">Recebidos</th>
                </tr>
              </div>
            </div>
          </tr>
        </thead>
        <tbody>
          {progresso.map((item) => {
            return (
              <tr
                key={item.id}
                className="hover:bg-gray-100 border-t border-gray-300"
              >
                <td className="p-4">{item.sector}</td>
                <td className="p-4">{item.area_name}</td>
                <td className="p-4">{item.technician_name}</td>

                <td>1</td>
                <td>1</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
