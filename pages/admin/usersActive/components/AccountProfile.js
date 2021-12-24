import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import axiosClient from "../../../../axiosClient";
const user = {
  avatar: "/static/images/avatars/avatar_6.png",
  city: "Los Angeles",
  country: "USA",
  jobTitle: "Senior Developer",
  name: "Katarina Smith",
  timezone: "GTM-7",
};

export const AccountProfile = (props) => {
  const [user, setUser] = useState([]);
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    async function FetchUser() {
      const response = await axiosClient.get(`/account-users/${id}`);
      setUser(response.data);
    }
    FetchUser();
  }, []);
  console.log("id:", id);
  return (
    <Card {...props}>
      <CardContent>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Avatar
            src={user.avatar}
            sx={{
              height: 64,
              mb: 2,
              width: 64,
            }}
          />
          <Typography color="textPrimary" gutterBottom variant="h5">
            {user.DisplayName}
          </Typography>
          <Typography color="textSecondary" variant="body2">
            {`${user.Email} `}
          </Typography>
          <Typography color="textSecondary" variant="body2">
            {user.Phone}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button color="primary" fullWidth variant="text">
          Upload picture
        </Button>
      </CardActions>
    </Card>
  );
};
