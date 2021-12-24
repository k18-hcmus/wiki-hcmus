import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import axiosClient from "../../../axiosClient";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useRouter } from "next/router";
import { Link } from "react-router-dom";
import { CardActions } from "@mui/material";

function ListPost() {
  const router = useRouter();
  const [listPost, setListPost] = React.useState();
  const [selectionModel, setSelectionModel] = React.useState();
  const [disable, setDisable] = useState(true);
  const [cachedPost, setCachedPost] = useState();
  const handleChangePostEdit = (e, params) => {
    //e.preventDefault();
    router.push(`http://localhost:3000/admin/post/${params.listPost.id}`);
  };
  const handleCreatePost = (e) => {
    //e.preventDefault();
    router.push("http://localhost:3000/admin/post/CreatePost");
  };
  useEffect(() => {
    async function FetchPost() {
      const result = await axiosClient.get("/posts");
      setListPost(result.data);
      setCachedPost(result.data);
    }
    FetchPost();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "Title", headerName: "title", width: 300 },
    { field: "ViewCount", headerName: "ViewCount", width: 100 },
    {
      field: "UpvoteCount",
      headerName: "UpvoteCount",
      width: 120,
    },
    {
      field: "Status",
      headerName: "Status",
      width: 100,
    },

    {
      field: "Action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Button
              onClick={() => {
                router.push(
                  `http://localhost:3000/admin/post/${params.row.id}`
                );
              }}
            >
              <EditIcon />
            </Button>
          </>
        );
      },
    },
  ];
  const handleClickDelPost = async () => {
    let delPost = await listPost.filter((p) => p.id !== selectionModel[0]);
    setListPost(delPost);
    setDisable(true);
  };
  const handleClickUndo = () => {
    setListPost(cachedPost);
    setDisable(true);
  };
  return (
    <div style={{ height: 400, width: "80%", marginLeft: 40, marginTop: 30 }}>
      <DataGrid
        rows={listPost}
        columns={columns}
        disableSelectionOnClick
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        onSelectionModelChange={(ids) => {
          setSelectionModel(ids);
          setDisable(false);
        }}
      />
      <CardActions>
        <Button
          variant="contained"
          color="primary"
          onClick={handleClickDelPost}
          disabled={disable}
        >
          DELETE
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleClickUndo}
          disabled={disable}
        >
          UNDO
        </Button>
      </CardActions>
    </div>
  );
}
export default ListPost;
