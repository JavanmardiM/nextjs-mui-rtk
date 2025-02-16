"use client";
import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  CircularProgress,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import {
  useFetchUsersQuery,
  useUpdateUserMutation,
} from "@/services/userService";
import { useTranslations } from "next-intl";
import { User } from "@/types/user";
import { useRouter, useParams } from "next/navigation";

export default function UserPage() {
  const { id } = useParams();
  const t = useTranslations();
  const router = useRouter();
  const { data: userData, isLoading } = useFetchUsersQuery(1);
  const [updateUser] = useUpdateUserMutation();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (userData?.data && id) {
      const foundUser = userData.data.find(
        (user: User) => user.id === Number(id)
      );
      setUser(foundUser || null);
    }
  }, [userData, id]);

  const handleCancel = () => {
    router.push("/admin/users");
  };

  const handleUpdate = () => {
    if (user) {
      updateUser({ id: user.id, user })
        .unwrap()
        .then(() => {
          router.push("/admin/users");
        });
    }
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

  if (!user) return <Typography>{t("USER_NOT_FOUND")}</Typography>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {t("USER_EDIT")}
      </Typography>
      <Card>
        <CardHeader
          avatar={<Avatar src={user.avatar} alt={user.first_name} />}
          title={`${user.first_name} ${user.last_name}`}
          subheader={user.email}
        />
        <Grid container spacing={3} sx={{ padding: 2 }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label={t("USER_FIRST_NAME")}
              value={user.first_name}
              onChange={(e) => setUser({ ...user, first_name: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label={t("USER_LAST_NAME")}
              value={user.last_name}
              onChange={(e) => setUser({ ...user, last_name: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label={t("USER_EMAIL")}
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="flex-end" gap={2}>
            <Button variant="outlined" onClick={handleCancel}>
              {t("CANCEL")}
            </Button>
            <Button variant="contained" color="primary" onClick={handleUpdate}>
              {t("SAVE")}
            </Button>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
}
