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

import ColumnChart from './ColumnChart'

const TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY;
/* import { useEffect, useState } from "react";
import { delay } from "../../utils/delay";
 */
export const SalesPerCategory = () => {
  const [showChart, setShowChart] = useState(false);

  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    pageSize: 10,
    page: 0,
  });

  const handleToggle = () => setShowChart((prev) => !prev);

  const token = localStorage.getItem(TOKEN_KEY);

  const { query } = useList({
    resource: "sales_per_category",
    meta: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  //console.log(queryResult)

  const { data, isLoading, isError } = query;
  // SIMLUATE isLoading
  //const [loading, setLoading] = useState(true);

  /* useEffect(() => {
        // Simulate a delay of 2 seconds before loading finishes
        const simulateLoading = async () => {
            await delay(2000);
            setLoading(false);
        };

        simulateLoading();
    }, []); */
  const items = data?.data ?? [];
  console.log(items)
  const columns: GridColDef[] = [
    { field: "category_id", headerName: "Category ID", width: 130 },
    { field: "category_name", headerName: "Όνομα", flex: 1 },
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
    id: item.category_id, // Required by DataGrid
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
        Πωλήσεις ανά Κατηγγορία
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
          disabled={!Array.isArray(items) || items.length === 0}
        >
          {showChart ? "Απόκρυψη Γραφήματος" : "Εμφάνιση Γραφήματος"}
        </Button>

        <Collapse in={showChart}>
          <Box mt={2}>
            <ColumnChart
              data={items as { category_name: string; total_sales: number }[]}
              title="Πωλήσεις ανα Προϊόν"
            />
          </Box>
        </Collapse>
      </Box>
    </Container>
  );
};
