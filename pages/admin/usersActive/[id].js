import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
const DetailUser = () => {
  const [user, setUser] = useState({});
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    async function FetchUserById() {
      try {
        const response = await axios.get(
          `http://localhost:1337/account-users/${id}`
        );
        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    FetchUserById();
  }, []);
  console.log(user);
  return (
    <Card sx={{ maxWidth: 345, mt: 3 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="https://picsum.photos/200/300"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {user.DisplayName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default DetailUser;
