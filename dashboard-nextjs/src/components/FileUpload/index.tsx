import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Typography, IconButton } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';

interface FileUploadProps {
  maxSize: number;
  onFilesSelected: (file: File | null) => void; // Changed from onFileSelect
  acceptedTypes?: string[];
}

const FileUpload: React.FC<FileUploadProps> = ({ maxSize, onFilesSelected, acceptedTypes }) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string>('');

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const selectedFile = acceptedFiles[0];

      if (selectedFile.size > maxSize) {
        setError(`File size must be less than ${maxSize / (1024 * 1024)}MB`);
        return;
      }

      setFile(selectedFile);
      onFilesSelected(selectedFile);
      setError('');

      // Create preview for images
      if (selectedFile.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(selectedFile);
      } else {
        setPreview(null);
      }
    },
    [maxSize, onFilesSelected],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedTypes ? Object.fromEntries(acceptedTypes.map(type => [type, []])) : undefined,
    maxFiles: 1,
  });

  const handleRemove = () => {
    setFile(null);
    setPreview(null);
    onFilesSelected(null); // Changed from onFileSelect
  };

  return (
    <Box>
      {!file ? (
        <Box
          {...getRootProps()}
          sx={{
            border: '2px dashed',
            borderColor: isDragActive ? 'primary.main' : 'grey.300',
            borderRadius: 1,
            p: 2,
            textAlign: 'center',
            cursor: 'pointer',
            '&:hover': {
              borderColor: 'primary.main',
              bgcolor: 'action.hover',
            },
          }}>
          <input {...getInputProps()} />
          <CloudUploadIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
          <Typography>{isDragActive ? 'Drop the file here' : 'Drag and drop a file here, or click to select'}</Typography>
          <Typography variant='caption' color='textSecondary'>
            Max size: {maxSize / (1024 * 1024)}MB
          </Typography>
          {error && (
            <Typography color='error' variant='caption'>
              {error}
            </Typography>
          )}
        </Box>
      ) : (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            p: 2,
            border: '1px solid',
            borderColor: 'grey.300',
            borderRadius: 1,
          }}>
          {preview && (
            <Box
              component='img'
              src={preview}
              alt='Preview'
              sx={{
                width: 100,
                height: 100,
                objectFit: 'cover',
                borderRadius: 1,
              }}
            />
          )}
          <Box sx={{ flexGrow: 1 }}>
            <Typography>{file.name}</Typography>
            <Typography variant='caption' color='textSecondary'>
              {(file.size / (1024 * 1024)).toFixed(2)}MB
            </Typography>
          </Box>
          <IconButton onClick={handleRemove} color='error'>
            <DeleteIcon />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

export default FileUpload;
