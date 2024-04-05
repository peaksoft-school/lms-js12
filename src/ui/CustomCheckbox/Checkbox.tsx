import { Checkbox } from "@mui/material";
import { FC } from "react";
import scss from "./Checkbox.module.scss";

interface CheckboxProps {
  disabled: boolean;
}

const Checkboxs: FC<CheckboxProps> = ({disabled }) => {
  return (
    <>
      <Checkbox
        className={scss.HoverForCheck}
        disabled={disabled}
        inputProps={{ "aria-label": "Checkbox demo" }}
      />
    </>
  );
};

export default Checkboxs;
