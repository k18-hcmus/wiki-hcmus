import styled from "@emotion/styled";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { Button, Grid } from "@mui/material";
const ContentContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: 100px;
`;
const ContentWrapper = styled.div`
  display: flex;
  padding: 20px;
  gap: 40px;
`;
const Tabs = styled(Button)({
  display: "flex",
  justifyContent: "spaceEvenly",
  alignItems: "center",
  width: "250px",
  height: "100px",
  backgroundColor: "#dad4d4",
  borderRadius: "10px",
  cursor: "pointer",
  boxShadow: "3px 0px 6px 0px rgba(246, 246, 246, 0.75)",
});

const Categories = styled.div`
  color: rgb(70, 105, 70);
`;

function Dashboard() {
  const router = useRouter();
  const handleClickUser = (e) => {
    e.preventDefault();
    router.push("http://localhost:3000/admin/UsersActive");
  };
  const handleClickPost = (e) => {
    e.preventDefault();
    router.push("http://localhost:3000/admin/post");
  };
  return (
    <ContentContainer>
      <ContentWrapper>
        <Tabs onClick={handleClickUser}>
          <Categories>
            <h2>Users</h2>
          </Categories>
        </Tabs>
        <Tabs onClick={handleClickPost}>
          <Categories>
            <h2>Post</h2>
          </Categories>
        </Tabs>
        <Tabs>
          <Categories>
            <h2>Announce</h2>
          </Categories>
        </Tabs>
        <Tabs>
          <Categories>
            <h2>Feedback</h2>
          </Categories>
        </Tabs>
      </ContentWrapper>
    </ContentContainer>
  );
}

export default Dashboard;
