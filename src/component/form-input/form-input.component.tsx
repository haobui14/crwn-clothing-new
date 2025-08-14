import { FC } from "react";
import TextField from "@mui/material/TextField";

import { TextFieldProps } from "@mui/material/TextField";

type FormInputProps = {
  label: string;
} & Omit<TextFieldProps, "variant" | "label">;

const FormInput: FC<FormInputProps> = ({ label, ...otherProps }) => {
  return (
    <TextField
      label={label}
      variant="outlined"
      fullWidth
      margin="normal"
      {...otherProps}
    />
  );
};

export default FormInput;
