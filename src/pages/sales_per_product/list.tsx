import { useList } from "@refinedev/core";
import {
  Typography,
  CircularProgress,
  Container,
  Box,
  Button,
  Collapse,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import { GridPaginationModel } from "@mui/x-data-grid";

import PieChart from "./PieChart";

const TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY;

export const SalesPerProduct = () => {
  const [showChart, setShowChart] = useState(false);

  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    pageSize: 10,
    page: 0,
  });

  const handleToggle = () => setShowChart((prev) => !prev);

  const token = localStorage.getItem(TOKEN_KEY);

  const { query } = useList({
    resource: "sales_per_product",
    meta: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  const { data, isLoading, isError } = query;
  const items = data?.data ?? [];
  //console.log(items)
  const columns: GridColDef[] = [
    { field: "product_id", headerName: "Product ID", width: 130 },
    { field: "product_name", headerName: "Όνομα", flex: 1 },
    { field: "total_quantity", headerName: "Ποσότητα", type: "number", width: 130 },
    {
      field: "total_sales",
      headerName: "Συνολικές Πωλήσεις",
      type: "number",
      width: 180,
      //valueFormatter: (params: { value: number }) => `${params.value} Euros`,
    },
  ];

  const rows = items.map((item: any) => ({
    id: item.product_id, // Required by DataGrid
    ...item,
  }));

  if (isLoading) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="flex-start"
        height="100vh"
        pt={8}
      >
        <CircularProgress />
        <Typography variant="body1" mt={2}>
          Φόρτωση, παρακαλώ περιμένετε...
        </Typography>
      </Box>
    );
  }

  if (isError) return <Typography sx={{ m: 2 }} align="center" color="red">Σφάλμα φόρτωσης δεδομένων</Typography>;

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Πωλήσεις Προϊόντων
      </Typography>

      <Box sx={{ width: "100%", maxHeight: "70vh", overflow: "auto", mb: 3 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[5, 10, 20]}
          disableRowSelectionOnClick
          sx={{ minHeight: 300 }}
        />
      </Box>

      <Box mt={3}>
        <Button
          variant="contained"
          onClick={handleToggle}
          disabled={items.length === 0}
        >
          {showChart ? "Απόκρυψη Γραφήματος" : "Εμφάνιση Γραφήματος"}
        </Button>

        <Collapse in={showChart}>
          <Box mt={2}>
            <PieChart
              data={items as { product_name: string; total_sales: number }[]}
              title="Πωλήσεις ανα ΠροΪόν"
            />
          </Box>
        </Collapse>
      </Box>
    </Container>
  );
};
