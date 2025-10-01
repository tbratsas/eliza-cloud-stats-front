import { useLogin } from "@refinedev/core";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Container, TextField, Button, Typography, Alert } from "@mui/material";

export const LoginPage = () => {
  const { mutate: login } = useLogin();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(
      { username, password },
      {
        onSuccess: () => {
          setError("");
          navigate("/dashboard");
        },
        onError: (err) => {
          console.error("Login failed:", err);
          setError("Λανθασμένα στοιχεία σύνδεσης. Παρακαλώ δοκιμάστε ξανά.");
        },
      }
    );
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Typography variant="h5" gutterBottom>Σύνδεση</Typography>
      {error && (
        <Alert severity="error" variant="outlined" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Όνομα χρήστη"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value)
            setError("");
          }}
        />
        <TextField
          label="Κωδικός"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
            setError("");
          }}
        />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Είσοδος
        </Button>
      </form>
    </Container>
  );
};
