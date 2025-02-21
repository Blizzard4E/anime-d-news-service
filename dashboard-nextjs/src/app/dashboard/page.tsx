// 'use client';
// import { Box, Typography } from '@mui/material';
// import MovieIcon from '@mui/icons-material/Movie';
// import PlayCircleIcon from '@mui/icons-material/PlayCircle';
// import GroupIcon from '@mui/icons-material/Group';
// import StatsCard from '@/components/StatsCard';
// import Grid from '@mui/material/Grid2';
// import { useDashboardStats } from '@/hooks/useDashboard';
// import { Skeleton } from '@mui/material';
// import RecentAnimeCard from '@/components/RecentAnimeCard';

// const Dashboard = () => {
//   const { data: dashboardData, isLoading, error } = useDashboardStats();

//   const statsData = [
//     {
//       title: 'Total Anime',
//       value: dashboardData?.data.totals.anime.toLocaleString() || '0',
//       icon: <MovieIcon sx={{ fontSize: 32, color: 'white' }} />,
//       gradient: 'linear-gradient(45deg, #FF1F8F 30%, #FF8C00 90%)',
//     },
//     {
//       title: 'Total Episodes',
//       value: dashboardData?.data.totals.episodes.toLocaleString() || '0',
//       icon: <PlayCircleIcon sx={{ fontSize: 32, color: 'white' }} />,
//       gradient: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
//     },
//     {
//       title: 'Total Users',
//       value: dashboardData?.data.totals.users.toLocaleString() || '0',
//       icon: <GroupIcon sx={{ fontSize: 32, color: 'white' }} />,
//       gradient: 'linear-gradient(45deg, #7E57C2 30%, #B388FF 90%)',
//     },
//   ];

//   return (
//     <Box>
//       <Box sx={{ mb: '1rem' }}>
//         <Typography variant='h2' sx={{ fontWeight: 'bold' }}>
//           Dashboard
//         </Typography>
//         <Typography variant='h6' sx={{ fontWeight: 'bold', color: 'rgba(0,0,0,0.6)' }}>
//           Overview of all Anime Content
//         </Typography>
//       </Box>

//       {/* Stats Cards Grid */}
//       <Grid container spacing={3} sx={{ mb: '1rem' }}>
//         {isLoading ? (
//           // Show loading skeletons
//           [...Array(3)].map((_, index) => (
//             <Grid size={4} key={index}>
//               <Skeleton
//                 variant='rectangular'
//                 height={160}
//                 sx={{
//                   borderRadius: 2,
//                   backgroundColor: 'rgba(0,0,0,0.1)',
//                 }}
//               />
//             </Grid>
//           ))
//         ) : error ? (
//           // Show error message
//           <Grid size={12}>
//             <Typography color='error' align='center'>
//               Failed to load dashboard statistics
//             </Typography>
//           </Grid>
//         ) : (
//           // Show stats cards
//           statsData.map((stat, index) => (
//             <Grid size={4} key={index}>
//               <StatsCard title={stat.title} value={stat.value} icon={stat.icon} gradient={stat.gradient} />
//             </Grid>
//           ))
//         )}
//       </Grid>

//       <Grid container spacing={3} sx={{ mb: '1rem' }}>
//         <Grid size={12}>
//           <Typography variant='h6' sx={{ fontWeight: 'bold', color: 'rgba(0,0,0,1)' }}>
//             Recent Anime
//           </Typography>
//         </Grid>
//         {isLoading ? (
//           // Show loading skeletons for recent anime
//           [...Array(4)].map((_, index) => (
//             <Grid size={3} key={`skeleton-${index}`}>
//               <Skeleton
//                 variant='rectangular'
//                 height={300}
//                 sx={{
//                   borderRadius: 4,
//                   backgroundColor: 'rgba(0,0,0,0.1)',
//                   mb: 2,
//                 }}
//               />
//               <Skeleton
//                 variant='text'
//                 width='80%'
//                 sx={{
//                   backgroundColor: 'rgba(0,0,0,0.1)',
//                 }}
//               />
//             </Grid>
//           ))
//         ) : error ? (
//           <Grid size={12}>
//             <Typography color='error' align='center'>
//               Failed to load recent anime
//             </Typography>
//           </Grid>
//         ) : dashboardData?.data.recent.anime && dashboardData.data.recent.anime.length > 0 ? (
//           // Show recent anime cards
//           dashboardData.data.recent.anime.map(anime => (
//             <Grid size={3} key={anime._id}>
//               <RecentAnimeCard title={anime.title} posterUrl={anime.posterUrl} />
//             </Grid>
//           ))
//         ) : (
//           <Grid size={12}>
//             <Typography align='center' color='text.secondary'>
//               No recent anime available
//             </Typography>
//           </Grid>
//         )}
//       </Grid>
//     </Box>
//   );
// };

// export default Dashboard;

const Dashboard = () => {
  return <div>Dashboard</div>;
};

export default Dashboard;
