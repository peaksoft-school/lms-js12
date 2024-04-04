import LayoutAdmin from "./pagesAdmin/components/layout/LayoutAdmin";
import LayoutInstrutor from "./pagesInstructor/components/layout/LayoutInstrutor";
import LayoutStudents from "./pagesStudents/components/layout/LayoutStudents";

function App() {
  return (
    <>
      <LayoutAdmin />
      <LayoutInstrutor />
      <LayoutStudents />
    </>
  );
}

export default App;
