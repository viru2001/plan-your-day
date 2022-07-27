import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

const CssTextField = styled(TextField)`
  /* default */
  .MuiInput-underline:before {
    border-bottom: 2px solid #fff;
  }
  /* hover (double-ampersand needed for specificity reasons. */
  && .MuiInput-underline:hover:before {
    border-bottom: 2px solid #fff;
  }
  /* focused */
  .MuiInput-underline:after {
    border-bottom: 2px solid #fff;
  }
`;

export { CssTextField };
