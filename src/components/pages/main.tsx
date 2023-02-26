import { IconButton, SimpleButton } from "../input/button";
import { Grid } from "../layout/grid";
import { Home } from "@styled-icons/ionicons-outline";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../library/axios";
import { Document } from "@styled-icons/ionicons-outline";
import { UploadedFile, useClientStore } from "../../zustand";
import { useNavigate } from "react-router-dom";
import { DefaultAlert } from "../content/alert";

export default function MainPage() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [file, setFile] = useState<File | undefined>();
  const [count, setCount] = useState(0);
  const clientStore = useClientStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!clientStore.user) return navigate("/");

    axiosInstance
      .get<UploadedFile[]>("user/files")
      .then(({ data }) => setFiles(data));
  }, [count]);

  const handleDownload = async (path: string) => {
    const resp = await axiosInstance.post(
      "download",
      { path },
      { responseType: "blob" }
    );

    const href = URL.createObjectURL(resp.data);
    const link = document.createElement("a");
    link.href = href;
    link.setAttribute("download", path);
    document.body.appendChild(link);
    link.click();

    link.remove();
    URL.revokeObjectURL(href);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.currentTarget.files) return;

    setFile(e.currentTarget.files[0]);
  };

  const handleFileUpload = async () => {
    if (!file) return;

    const form = new FormData();
    form.set("file", file);

    try {
      await axiosInstance.post("user/upload", form, {
        headers: { "Content-Type": file.type, "Content-Length": file.size },
      });

      setFile(undefined);
      //TODO: show message to client
    } catch {
      //TODO: show error to client
    }
  };

  return (
    <Grid style={{ height: "100%" }}>
      <Grid
        direction="column"
        style={{
          padding: "10px",
          gap: "5px",
          borderRight: "1px solid rgba(255,255,255,0.2)",
          height: "100%",
        }}
      >
        <IconButton>
          <Home size={25} />
        </IconButton>
      </Grid>

      <Grid
        direction="column"
        style={{ gap: "25px", padding: "20px", width: "100%" }}
      >
        <h1>Filey Client</h1>

        <Grid alignItems="center" style={{ gap: "25px" }}>
          <h3>File List</h3>
          <SimpleButton onClick={() => setCount((old) => old + 1)}>
            Refresh lists
          </SimpleButton>
        </Grid>

        <Grid style={{ gap: "15px" }}>
          {files.map((file, idx) => (
            <Grid
              direction="column"
              alignItems="center"
              key={`filey-file-list-item-${idx}`}
              className="filey-item"
              onClick={() => handleDownload(file.path)}
            >
              <Document size={100} opacity={0.05} />
              <p style={{ fontWeight: 500 }}>{file.path}</p>
            </Grid>
          ))}
        </Grid>

        <h3>Upload File</h3>
        <DefaultAlert>
          <p>File will be saved in server instantly when you click button.</p>
        </DefaultAlert>

        <label className="filey-upload">
          <input
            type="file"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />

          <p style={{ fontWeight: 700, fontSize: "30px" }}>
            Drag file or click here to upload file.
          </p>
          {file && (
            <p style={{ fontWeight: 500, fontSize: "20px" }}>{file.name}</p>
          )}
        </label>
        <SimpleButton onClick={handleFileUpload}>Upload</SimpleButton>
      </Grid>
    </Grid>
  );
}
