'use client';
import * as React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import Image from 'next/image';
import {
  Box,
  Drawer as MuiDrawer,
  List,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  ContentPaste as ContentIcon,
  Person as ProfileIcon,
} from '@mui/icons-material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// Constants
const DRAWER_WIDTH = 320;
const MENU_ITEMS = [
  { text: 'Dashboard', icon: DashboardIcon, path: '/dashboard' },
  { text: 'Content Management', icon: ContentIcon, path: '/dashboard/content-management' },
  { text: 'Profile', icon: ProfileIcon, path: '/dashboard/profile' },
];

interface MiniDrawerProps {
  children?: React.ReactNode;
}

// Styled Components
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  position: 'relative',
  alignItems: 'center',
  justifyContent: 'center',
  ...theme.mixins.toolbar,
}));

// Drawer Mixins
const createDrawerMixin = (theme: Theme, isOpen: boolean): CSSObject => ({
  width: isOpen ? DRAWER_WIDTH : `calc(${theme.spacing(7)} + 1px)`,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration[isOpen ? 'enteringScreen' : 'leavingScreen'],
  }),
  borderRight: 'none',
  background: 'none',
  overflowX: 'hidden',
  ...(isOpen
    ? {}
    : {
        [theme.breakpoints.up('sm')]: {
          width: `calc(${theme.spacing(8)} + 1px)`,
        },
      }),
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: prop => prop !== 'open',
})(({ theme, open }) => ({
  width: DRAWER_WIDTH,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  '& .MuiDrawer-paper': createDrawerMixin(theme, !!open),
  ...createDrawerMixin(theme, !!open),
}));

// Main Component
const DashboardDrawer: React.FC<MiniDrawerProps> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = React.useState(true);

  const isActiveRoute = (path: string): boolean => {
    // Special case for dashboard to avoid matching all routes
    if (path === '/dashboard') {
      return pathname === '/dashboard';
    }
    // For other routes, use startsWith to match sub-routes
    return pathname.startsWith(path);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer variant='permanent' open={open}>
        <DrawerHeader>
          <Box sx={{ display: open ? 'flex' : 'none', margin: 'auto', alignItems: 'center', mt: 2 }}>
            <Image src='/assets/images/logo.png' alt='logo' width={80} height={80} style={{ marginRight: '0.5rem' }} />
            <Typography
              variant='h6'
              sx={{
                fontWeight: 'bold',
                letterSpacing: 2,
                padding: '0.3rem 0.5rem',
                borderRadius: '16px',
              }}>
              <span style={{ color: 'rgba(255, 31, 143,1)' }}>Chibi</span>
              <span style={{ color: 'rgba(255, 140, 0,1)' }}>Stream</span>
              <br />
              <span style={{ fontSize: '14px' }}>We Watch Anime</span>
            </Typography>
          </Box>
          <IconButton
            onClick={() => setOpen(!open)}
            sx={{
              position: open ? 'absolute' : 'relative',
              right: open ? '8px' : 'auto',
              top: open ? '8px' : 'auto',
              margin: !open ? 'auto' : 0,
            }}>
            {open ? (
              <MenuIcon
                sx={{ background: 'rgba(255, 140, 0,1)', color: 'white', borderRadius: '50%', fontSize: '2rem', p: 0.5 }}
              />
            ) : (
              <ArrowForwardIosIcon
                sx={{
                  background: 'rgba(255, 140, 0,1)',
                  borderRadius: '50%',
                  fontSize: '2rem',
                  p: 1,
                  color: 'white',
                }}
              />
            )}
          </IconButton>
        </DrawerHeader>
        {/* menu list */}
        <List sx={{ padding: '1rem' }}>
          {MENU_ITEMS.map(({ text, icon: Icon, path }) => {
            const active = isActiveRoute(path);
            return (
              <ListItem key={text} disablePadding sx={{ display: 'block', mb: 1 }}>
                <ListItemButton
                  onClick={() => router.push(path)}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    letterSpacing: active ? 2 : 0,
                    fontWeight: 'bold',
                    transition: 'all 0.2s',
                    backgroundColor: active ? 'rgba(255, 140, 0,1)' : 'transparent',
                    color: active ? 'white' : 'inherit',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 140, 0,1)',
                      color: 'white',
                      letterSpacing: 2,
                    },
                  }}>
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 1 : 'auto',
                      justifyContent: 'center',
                      color: 'inherit',
                    }}>
                    <Icon />
                  </ListItemIcon>
                  <ListItemText
                    primary={text}
                    sx={{
                      opacity: open ? 1 : 0,
                      '.MuiTypography-root': {
                        fontWeight: 600,
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Drawer>
      <div className='w-full h-full overflow-auto py-4 px-10'>{children}</div>
    </Box>
  );
};

export default DashboardDrawer;
