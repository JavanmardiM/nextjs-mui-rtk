"use client";

import React, { useState } from "react";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardHeader,
  CircularProgress,
  Container,
  Typography,
  Box,
  Grid,
  Pagination,
} from "@mui/material";
import {
  useDeleteUserMutation,
  useFetchUsersQuery,
} from "@/services/userService";
import { useTranslations } from "next-intl";
import { User } from "@/types/user";

export default function Users() {
  const [page, setPage] = useState(1);
  const { data: userData, error, isLoading } = useFetchUsersQuery(page);
  const [deleteUser] = useDeleteUserMutation();
  const t = useTranslations();

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  if (isLoading)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography color="error" variant="h6">
          {t("USER_ERROR_LOADING")}
        </Typography>
      </Box>
    );

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {t("USER_LIST")}
      </Typography>
      <Grid container spacing={3}>
        {userData?.data.map((user: User) => (
          <Grid item xs={12} sm={6} md={4} key={user.id}>
            <Card>
              <CardHeader
                avatar={<Avatar src={user.avatar} alt={user.first_name} />}
                title={t("USER_USERNAME", {
                  firstName: user.first_name,
                  lastName: user.last_name,
                })}
                subheader={user.email}
              />
              <CardActions>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => console.log("View", user.id)}
                >
                  {t("USER_VIEW")}
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => console.log("Edit", user.id)}
                >
                  {t("USER_EDIT")}
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => deleteUser(user.id)}
                >
                  {t("USER_DELETE")}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box display="flex" justifyContent="center" marginTop={3}>
        <Pagination
          count={userData?.total_pages || 1}
          page={page}
          onChange={handleChangePage}
          variant="outlined"
          shape="rounded"
        />
      </Box>
    </Container>
  );
}
