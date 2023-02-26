import styled from "styled-components";
import { Grid } from "../layout/grid";

const SimpleTextBox = styled.input`
  appearance: none;
  border: none;
  outline: none;
  border-radius: 3px;
  background: #212121;
  transition: all 150ms;
  color: rgba(255, 255, 255, 0.87);
  padding: 10px 6px;
  border: 1px solid rgba(60, 60, 60, 0.7);
  font-size: 14px;

  &:focus {
    background: #202020;
  }
`;

function TextBoxWithLabel({
  children,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <Grid direction="column" style={{ gap: "3px" }}>
      <label style={{ fontSize: "12px", color: "rgba(170, 170, 170, 0.87)" }}>
        {children}
      </label>
      <SimpleTextBox {...props} />
    </Grid>
  );
}

export { SimpleTextBox, TextBoxWithLabel };
