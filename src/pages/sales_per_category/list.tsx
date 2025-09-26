import { useList } from "@refinedev/core";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  CircularProgress,
  Container,
} from "@mui/material";

export const SalesPerCategory = () => {
  const token = localStorage.getItem("auth");

  const queryResult = useList({
    resource: "sales_per_category",
    meta: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  //console.log(queryResult)

  const { data, isLoading, isError } = queryResult.query

  if (isLoading) return <CircularProgress />;
  if (isError) return <Typography>Σφάλμα φόρτωσης δεδομένων</Typography>;

  const items = data?.data ?? [];

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>Πωλήσεις ανά Κατηγγορία</Typography>
      <Table>
        <TableHead>
          <TableRow>
            {/* Replace with your actual field names */}
            <TableCell>Όνομα</TableCell>
            <TableCell>Συνολικές Πωλήσεις</TableCell>
            <TableCell>Συνολικές Πωλήσεις Euros</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item: any) => (
            <TableRow key={item.category_name}>
              <TableCell>{item.category_name}</TableCell>
              <TableCell>{item.total_quantity}</TableCell>
              <TableCell>{item.total_sales}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};
