import GridTable from '@/components/Table';
import { useNews, useDeleteNews } from '@/hooks/useNews';
import { useMemo, useState } from 'react';
import { GridColDef } from '@mui/x-data-grid';
import { Box, Button, Dialog, DialogContent, DialogTitle, IconButton, Typography, Snackbar, Alert } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloseIcon from '@mui/icons-material/Close';
import NewsDetail from '@/components/NewsDetail';
import { format } from 'date-fns';
import { NewsItem } from '@/services/news-service';

const NewsListTable = () => {
  const [openNewsDialog, setOpenNewsDialog] = useState(false);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null);

  const { data: newsData, isLoading } = useNews();
  const deleteNews = useDeleteNews();

  // Format data properly for the table with safe defaults
  const rows = useMemo(
    () =>
      (newsData ?? []).map(news => ({
        id: news.id,
        title: news.title,
        author: news.author?.username ?? 'Unknown',
        created_at: news.created_at ? format(new Date(news.created_at), 'MMM dd, yyyy HH:mm') : 'No date',
        likes_count: news.likes_count ?? 0,
        comments_count: news.comments?.length ?? 0,
        is_liked: news.is_liked ?? false,
      })),
    [newsData],
  );

  const handleViewNews = (news: NewsItem) => {
    setSelectedNews(news);
    setOpenNewsDialog(true);
  };

  const handleDeleteNews = async (id: string) => {
    deleteNews.mutate(id, {
      onSuccess: () => {
        setSnackbarMessage('News deleted successfully!');
      },
      onError: error => {
        console.error('Delete error:', error);
        setSnackbarMessage('Failed to delete news.');
      },
    });
  };

  const columns: GridColDef[] = useMemo(
    () => [
      { field: 'id', headerName: 'ID', width: 70 },
      { field: 'title', headerName: 'Title', flex: 1 },
      { field: 'author', headerName: 'Author', flex: 1 },
      { field: 'created_at', headerName: 'Created At', flex: 1 },
      { field: 'likes_count', headerName: 'Likes', width: 100 },
      { field: 'comments_count', headerName: 'Comments', width: 100 },
      {
        field: 'action',
        headerName: 'Actions',
        flex: 1,
        renderCell: params => (
          <Box display='flex' justifyContent='center' alignItems='center' gap={1} sx={{ height: '100%' }}>
            <Button
              variant='contained'
              color='info'
              size='small'
              onClick={() => {
                const news = newsData?.find(n => n.id === params.row.id);
                if (news) handleViewNews(news);
              }}>
              <VisibilityIcon />
            </Button>
            <Button variant='contained' color='error' size='small' onClick={() => handleDeleteNews(params.row.id)}>
              <DeleteIcon />
            </Button>
          </Box>
        ),
      },
    ],
    [newsData],
  );

  return (
    <>
      <GridTable
        rows={rows}
        columns={columns}
        loading={isLoading}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
          sorting: { sortModel: [{ field: 'created_at', sort: 'desc' }] },
        }}
      />

      <Dialog fullWidth maxWidth='md' open={openNewsDialog} onClose={() => setOpenNewsDialog(false)}>
        <DialogTitle>
          <Box display='flex' justifyContent='space-between' alignItems='center'>
            <Typography variant='h6'>News Post</Typography>
            <IconButton onClick={() => setOpenNewsDialog(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedNews ? <NewsDetail news={selectedNews} /> : <Typography>No news available.</Typography>}
        </DialogContent>
      </Dialog>

      <Snackbar
        open={!!snackbarMessage}
        autoHideDuration={3000}
        onClose={() => setSnackbarMessage(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert severity={snackbarMessage?.includes('success') ? 'success' : 'error'} onClose={() => setSnackbarMessage(null)}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default NewsListTable;
