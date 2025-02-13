import { BrowserRouter, Route, Routes } from "react-router-dom";

import { LoginPage } from "./pages/Login";
// import { Table } from "./components/tables/Table";
import { Table } from "./pages/Table";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/table" element={<Table />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
