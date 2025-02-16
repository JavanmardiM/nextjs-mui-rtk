"use client";
import React, { useState } from "react";
import {
  Button,
  Card,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useCreateUserMutation } from "@/services/userService";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useToastHandler } from "@/hooks/useToastHandler";

export default function AddUser() {
  const router = useRouter();
  const t = useTranslations();
  const { showToast } = useToastHandler();
  const [createUser] = useCreateUserMutation();
  const [newUser, setNewUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    avatar: "",
  });

  const handleAddUser = () => {
    createUser(newUser)
      .unwrap()
      .then(() => {
        showToast(t("USER_CREATE_SUCCESS"), "success");
        router.push("/admin/users");
      })
      .catch(() => {
        showToast(t("USER_CREATE_ERROR"), "error");
      });
  };

  const handleCancel = () => {
    router.push("/admin/users");
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {t("USER_ADD_NEW")}
      </Typography>
      <Card>
        <Grid container spacing={3} sx={{ padding: 2 }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label={t("USER_FIRST_NAME")}
              value={newUser.first_name}
              onChange={(e) =>
                setNewUser({ ...newUser, first_name: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label={t("USER_LAST_NAME")}
              value={newUser.last_name}
              onChange={(e) =>
                setNewUser({ ...newUser, last_name: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label={t("USER_EMAIL")}
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="flex-end" gap={2}>
            <Button variant="outlined" onClick={handleCancel}>
              {t("CANCEL")}
            </Button>
            <Button variant="contained" color="primary" onClick={handleAddUser}>
              {t("SAVE")}
            </Button>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
}
