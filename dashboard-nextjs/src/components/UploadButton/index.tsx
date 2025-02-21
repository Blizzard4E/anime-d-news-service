import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography, Paper, IconButton } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { Theme } from '@mui/material/styles';

interface FileUploadProps {
  onFilesSelected?: (file: File | null) => void;
  maxSize?: number; // in bytes
  accept?: string; // Add accept prop for file types
}

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const StyledPaper = styled(Paper)(({ theme }: { theme: Theme }) => ({
  textAlign: 'center',
  cursor: 'pointer',
  // border: '1px solid black',
  backgroundColor: theme.palette.background.default,
  boxShadow: 'none',
  transition: theme.transitions.create(['background-color', 'box-shadow']),
  // '&:hover': {
  //   backgroundColor: theme.palette.action.hover,
  // },
}));

const DEFAULT_MAX_SIZE = 10 * 1024 * 1024; // 10MB in bytes

export default function FileUpload({ onFilesSelected, maxSize = DEFAULT_MAX_SIZE, accept }: FileUploadProps): React.JSX.Element {
  const [isDragging, setIsDragging] = React.useState<boolean>(false);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFiles = (files: File[]): void => {
    if (files.length === 0) {
      setSelectedFile(null);
      onFilesSelected?.(null);
      return;
    }

    const file = files[0]; // Take only the first file
    if (file.size > maxSize) {
      const maxSizeInMB = maxSize / (1024 * 1024);
      alert(`File is too large. Maximum file size is ${maxSizeInMB}MB.`);
      setSelectedFile(null);
      onFilesSelected?.(null);
      return;
    }

    if (accept && !accept.split(',').some(type => file.type.match(type.trim()))) {
      alert('File type not accepted');
      setSelectedFile(null);
      onFilesSelected?.(null);
      return;
    }

    setSelectedFile(file);
    onFilesSelected?.(file);
  };

  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const files = Array.from(event.target.files || []);
    handleFiles(files);
  };

  const handleRemoveFile = (e: React.MouseEvent): void => {
    e.stopPropagation();
    setSelectedFile(null);
    onFilesSelected?.(null);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <StyledPaper
      component='label'
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      elevation={isDragging ? 3 : 1}
      sx={{
        p: 3,
        borderColor: theme =>
          isDragging ? theme.palette.primary.main : selectedFile ? theme.palette.success.light : theme.palette.grey[300],
        borderRadius: 2,
      }}>
      {!selectedFile ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
          <CloudUploadIcon color='primary' sx={{ fontSize: 40 }} />
          <Typography variant='body1'>Drag your file or click to browse</Typography>
          <Typography variant='caption' color='text.secondary'>
            Max {maxSize / (1024 * 1024)}MB files are allowed
          </Typography>
          <VisuallyHiddenInput type='file' onChange={handleFileInput} accept={accept} />
        </Box>
      ) : (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            width: '100%',
            bgcolor: 'background.paper',
            borderRadius: 1,
            p: 1,
          }}>
          <CheckCircleIcon color='success' />
          <Box sx={{ flex: 1, overflow: 'hidden' }}>
            <Typography variant='body2' noWrap>
              {selectedFile.name}
            </Typography>
            <Typography variant='caption' color='text.secondary'>
              {formatFileSize(selectedFile.size)}
            </Typography>
          </Box>
          <IconButton onClick={handleRemoveFile} size='small' sx={{ '&:hover': { color: 'error.main' } }}>
            <DeleteIcon />
          </IconButton>
        </Box>
      )}
    </StyledPaper>
  );
}
