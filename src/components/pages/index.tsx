import { useInput } from "../../library/useInput";
import { DefaultAlert } from "../content/alert";
import { SimpleButton } from "../input/button";
import { TextBoxWithLabel } from "../input/textbox";
import { SimpleCard } from "../layout/card";
import { Grid } from "../layout/grid";
import { axiosInstance } from "../../library/axios";
import { useNavigate } from "react-router-dom";
import { useClientStore } from "../../zustand";
import { useEffect } from "react";

export function IndexPage() {
  const input = useInput({ name: undefined, password: undefined });
  const clientStore = useClientStore();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const data = input.data;

    if (!data || Object.keys(data).length !== 2) return;

    const { status, data: resp } = await axiosInstance.post<{
      access_token: string;
    }>("auth/login", data);

    if (status !== 201) {
      // TODO: show error message to client.
      return;
    }

    localStorage.setItem("token", resp.access_token);
    window.location.reload();
  };

  useEffect(() => {
    if (clientStore.user) {
      navigate("main");
    }
  }, [clientStore.user]);

  return (
    <Grid
      direction="column"
      justifyContent="center"
      alignItems="center"
      style={{ height: "90%" }}
    >
      <SimpleCard style={{ width: "400px" }}>
        <Grid direction="column" style={{ gap: "10px" }}>
          <h2>Login</h2>

          <DefaultAlert>
            <p>Self registeration is disabled. Please contact with admin.</p>
          </DefaultAlert>

          <TextBoxWithLabel onChange={input.handleChange("name")}>
            Username
          </TextBoxWithLabel>
          <TextBoxWithLabel onChange={input.handleChange("password")}>
            Password
          </TextBoxWithLabel>
          <SimpleButton onClick={handleSubmit}>Submit</SimpleButton>
        </Grid>
      </SimpleCard>
    </Grid>
  );
}
