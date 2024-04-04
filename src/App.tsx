import { Route, Routes } from "react-router-dom";
import LayoutAdmin from "./pagesAdmin/components/layout/LayoutAdmin";
import LayoutInstrutor from "./pagesInstructor/components/layout/LayoutInstrutor";
import LayoutStudents from "./pagesStudents/components/layout/LayoutStudents";

function App() {
  return (
    <>
      <Routes>
        <Route path="/*" element={<LayoutStudents />} />
        <Route path="/admin/*" element={<LayoutAdmin />} />
        <Route path="/instructor/*" element={<LayoutInstrutor />} />
      </Routes>
    </>
  );
}

export default App;
