import { styled } from "@mui/material";
import MuiTextField from "@mui/material/TextField";

export const StyledTextField = styled(MuiTextField)(({ theme }) => ({
  borderColor: "#fff",
  borderWidth: 0,

  "& fieldset": {
    border: "none",
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.secondary.main,

    "&. Mui-focused fieldset": { borderColor: theme.palette.secondary.main },
    "&. Mui-error fieldset": { borderColor: theme.palette.error.main },
  },

  "& .MuiInputBase-input.Mui-disabled": {
    WebkitTextFillColor: "#969696",
  },
}));
