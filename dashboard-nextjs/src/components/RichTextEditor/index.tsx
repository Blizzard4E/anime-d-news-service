import { useEditor, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import {
  Button,
  ButtonGroup,
  Paper,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Alert,
  Snackbar,
} from '@mui/material';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import { useState } from 'react';
import ImageIcon from '@mui/icons-material/Image';

interface MenuBarProps {
  editor: Editor | null;
}

interface ImageDialogProps {
  open: boolean;
  onClose: () => void;
  onInsert: (url: string) => void;
}

interface AlertState {
  open: boolean;
  message: string;
  severity: 'error' | 'warning' | 'info' | 'success';
}

interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
}

const ImageDialog: React.FC<ImageDialogProps> = ({ open, onClose, onInsert }) => {
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = () => {
    if (imageUrl) {
      onInsert(imageUrl);
      setImageUrl('');
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
      <DialogTitle>Insert Image</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin='dense'
          label='Image URL'
          type='url'
          fullWidth
          variant='outlined'
          value={imageUrl}
          onChange={e => setImageUrl(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant='contained' color='primary'>
          Insert
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const MenuBar: React.FC<MenuBarProps> = ({ editor }) => {
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const [alert, setAlert] = useState<AlertState>({
    open: false,
    message: '',
    severity: 'error',
  });

  if (!editor) {
    return null;
  }

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  const addImage = (url: string) => {
    if (url) {
      editor
        .chain()
        .focus()
        .insertContent({
          type: 'image',
          attrs: { src: url },
        })
        .run();
    }
  };

  return (
    <Box sx={{ mb: 2 }}>
      <ButtonGroup variant='outlined' size='small'>
        <Button
          onClick={() => editor.chain().focus().toggleBold().run()}
          sx={{
            backgroundColor: editor.isActive('bold') ? 'rgba(0, 0, 0, 0.1)' : 'inherit',
          }}>
          <FormatBoldIcon />
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          sx={{
            backgroundColor: editor.isActive('italic') ? 'rgba(0, 0, 0, 0.1)' : 'inherit',
          }}>
          <FormatItalicIcon />
        </Button>

        <Button onClick={() => setImageDialogOpen(true)}>
          <ImageIcon /> URL
        </Button>
      </ButtonGroup>

      <ImageDialog open={imageDialogOpen} onClose={() => setImageDialogOpen(false)} onInsert={addImage} />

      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={handleCloseAlert} severity={alert.severity} sx={{ width: '100%' }}>
          {alert.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto',
          draggable: 'true',
        },
        allowBase64: true,
      }),
      Placeholder.configure({
        placeholder: 'Write your content here...',
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
    },
  });

  return (
    <Paper elevation={0}>
      <MenuBar editor={editor} />
      <Box
        sx={{
          p: 0,
          border: '1px solid #ddd',
          borderRadius: 1,
          minHeight: 300,
          '& .ProseMirror': {
            outline: 'none',
            minHeight: '300px',
            padding: '1rem',
            '& img': {
              maxWidth: '100%',
              height: 'auto',
              display: 'block',
              borderRadius: 1,
              '&.ProseMirror-selectednode': {
                outline: '2px solid #000',
              },
            },
            '& p': {
              margin: '1em 0',
            },
          },
          '& .ProseMirror p.is-editor-empty:first-child::before': {
            color: '#adb5bd',
            content: 'attr(data-placeholder)',
            float: 'left',
            height: 0,
            pointerEvents: 'none',
          },
        }}>
        <EditorContent editor={editor} />
      </Box>
    </Paper>
  );
};

export default RichTextEditor;
