import { useLogin } from "@refinedev/core";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Container, TextField, Button, Typography } from "@mui/material";

export const LoginPage = () => {
  const { mutate: login } = useLogin();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(
      { username, password },
      {
        onSuccess: () => {
          navigate("/sales_per_product"); // redirect after login
        },
      }
    );
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Typography variant="h5" gutterBottom>Σύνδεση</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Όνομα χρήστη"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Κωδικός"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Είσοδος
        </Button>
      </form>
    </Container>
  );
};
