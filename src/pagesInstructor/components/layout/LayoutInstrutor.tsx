import Header from "./header/Header";
import scss from "./LayoutInstructor.module.scss";

const LayoutInstrutor = () => {
  return (
    <>
      <div className={scss.Layout}>
        <Header />
        <main>Main</main>
      </div>
    </>
  );
};

export default LayoutInstrutor;
