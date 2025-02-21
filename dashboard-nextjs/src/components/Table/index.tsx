'use client';
import React, { JSX } from 'react';
import { DataGrid, GridColDef, GridToolbarContainer } from '@mui/x-data-grid';
import { Box, LinearProgress, useTheme, Typography } from '@mui/material';
import Toolbar from './ToolBar';
import InboxIcon from '@mui/icons-material/Inbox';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type CustomDataGridProps<T extends Record<string, any>> = {
  rows: T[];
  columns: GridColDef<T>[];
  loading: boolean;
  filterSection?: JSX.Element;
  [key: string]: unknown;
};

const DefaultToolbar: React.FC = () => (
  <GridToolbarContainer>
    <Box sx={{ width: '50%' }}>
      <Toolbar />
    </Box>
  </GridToolbarContainer>
);

const CustomNoRowsOverlay = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        p: 3,
        gap: 2,
      }}>
      <InboxIcon sx={{ fontSize: 50, color: theme.palette.text.secondary }} />
      <Typography variant='h6' color='text.secondary'>
        No Data Available
      </Typography>
    </Box>
  );
};

const CustomLoadingOverlay = () => (
  <Box
    sx={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      zIndex: 2,
    }}>
    <LinearProgress
      sx={{
        width: '40%',
        '& .MuiLinearProgress-bar': {
          backgroundColor: 'primary.main',
        },
      }}
    />
  </Box>
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const GridTable = <T extends Record<string, any>>({
  rows,
  columns,
  loading,
  filterSection,
  ...props
}: CustomDataGridProps<T>) => {
  const theme = useTheme();
  const ToolbarComponent = filterSection ? () => filterSection : DefaultToolbar;

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      loading={loading}
      disableColumnFilter
      disableColumnSelector
      disableDensitySelector
      disableRowSelectionOnClick
      slots={{
        toolbar: ToolbarComponent,
        loadingOverlay: CustomLoadingOverlay,
        noRowsOverlay: CustomNoRowsOverlay,
      }}
      slotProps={{
        toolbar: {
          showQuickFilter: true,
        },
      }}
      initialState={{
        filter: {
          filterModel: {
            items: [],
            quickFilterValues: [''],
          },
        },
        pagination: {
          paginationModel: {
            pageSize: 10,
          },
        },
      }}
      pageSizeOptions={[5, 10, 25]}
      sx={{
        border: 'none',
        '& .MuiDataGrid-root': {
          border: 'none',
          borderRadius: 0,
        },
        '& .MuiDataGrid-cell': {
          borderBottom: 'none',
          borderColor: 'transparent',
          '&:focus': {
            outline: 'none',
          },
          '&:focus-within': {
            outline: 'none',
          },
        },
        '& .MuiDataGrid-columnHeaders': {
          '& .MuiDataGrid-columnHeader': {
            borderBottom: 'none',
            '&:focus': {
              outline: 'none',
            },
            '&:focus-within': {
              outline: 'none',
            },
          },
        },

        '& .MuiDataGrid-columnHeaderTitle': {
          fontWeight: 'bold',
          color: theme.palette.text.primary,
        },
        '& .MuiDataGrid-main': {
          borderBottom: 'none',
        },
        '& .MuiDataGrid-row': {
          borderRadius: '24px',
          '&:hover': {
            backgroundColor: theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.04)' : 'rgba(255, 255, 255, 0.04)',
            transition: 'background-color 0.2s ease',
          },
          '&:nth-of-type(even)': {
            backgroundColor: theme.palette.mode === 'light' ? 'rgba(137, 207, 240,0.15)' : 'rgba(255, 255, 255, 0.02)',
          },
        },
        '& .MuiDataGrid-footerContainer': {
          borderTop: 'none',
        },
        '& .MuiTablePagination-root': {
          color: theme.palette.text.secondary,
        },
      }}
      {...props}
    />
  );
};

export default GridTable;
