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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import {
  useDeleteUserMutation,
  useFetchUsersQuery,
} from "@/services/userService";
import { useTranslations } from "next-intl";
import { User } from "@/types/user";
import { useToastHandler } from "@/hooks/useToastHandler";
import { useRouter } from "next/navigation";

export default function Users() {
  const [page, setPage] = useState(1);
  const {
    data: userData,
    error,
    isLoading,
    refetch,
  } = useFetchUsersQuery(page);
  const [deleteUser] = useDeleteUserMutation();
  const t = useTranslations();
  const { showToast } = useToastHandler();

  const router = useRouter();

  const [openDialog, setOpenDialog] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const handleDeleteClick = (user: User) => {
    setUserToDelete(user);
    setOpenDialog(true);
  };

  const handleConfirmDelete = () => {
    if (userToDelete) {
      deleteUser(userToDelete.id)
        .unwrap()
        .then(() => {
          showToast(t("USER_DELETE_SUCCESS"), "success");
          refetch();
        })
        .catch(() => {
          showToast(t("USER_DELETE_ERROR"), "error");
        });
    }
    setOpenDialog(false);
  };

  const handleCancelDelete = () => {
    setOpenDialog(false);
  };

  const handleCreateUser = () => {
    router.push("/admin/users/add");
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
      <Box
        sx={{ display: "flex", justifyContent: "flex-end", marginBottom: 2 }}
      >
        <Button variant="contained" color="primary" onClick={handleCreateUser}>
          {t("USER_CREATE_LABEL")}
        </Button>
      </Box>
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
                  color="secondary"
                  onClick={() => router.push(`/admin/users/${user.id}`)}
                >
                  {t("USER_EDIT")}
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleDeleteClick(user)}
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

      <Dialog open={openDialog} onClose={handleCancelDelete}>
        <DialogTitle>{t("DIALOG_TITLE")}</DialogTitle>
        <DialogContent>
          <Typography>
            {t("DIALOG_MESSAGE", {
              title: userToDelete
                ? `${userToDelete.first_name} ${userToDelete.last_name}`
                : "",
            })}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            {t("DIALOG_CANCEL")}
          </Button>
          <Button onClick={handleConfirmDelete} color="secondary">
            {t("DIALOG_DELETE")}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
