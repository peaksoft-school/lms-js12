import scss from "./LayoutStudents.module.scss";
import Header from "./header/Header";

const LayoutStudents = () => {
  return (
    <>
      <div className={scss.Layout}>
        <Header />
        <main>Main</main>
      </div>
    </>
  );
};

export default LayoutStudents;
