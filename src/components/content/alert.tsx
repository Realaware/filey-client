import styled from "styled-components";
import { AlertCircle } from "@styled-icons/ionicons-outline";
import { Grid } from "../layout/grid";

const AlertContainer = styled.div`
  background: rgba(255, 255, 255, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.7);
  display: flex;
  flex-direction: column;
  gap: 5px;
  border-radius: 10px;
  color: rgba(255, 255, 255, 0.87);

  padding: 10px;
`;

function DefaultAlert({ children }: { children?: any }) {
  return (
    <AlertContainer>
      <Grid alignItems="center" style={{ gap: "10px" }}>
        <AlertCircle size={20} />{" "}
        <p style={{ fontWeight: 700, fontSize: "16px" }}>Alert</p>
      </Grid>
      {children}
    </AlertContainer>
  );
}

export { AlertContainer, DefaultAlert };
