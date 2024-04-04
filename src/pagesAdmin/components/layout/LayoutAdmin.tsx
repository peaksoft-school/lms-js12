import scss from "./LayoutAdmin.module.scss";
import Header from "./header/Header";

const LayoutAdmin = () => {
  return (
    <>
      <div className={scss.Layout}>
        <Header />
        <main>Main</main>
      </div>
    </>
  );
};

export default LayoutAdmin;
