// import React, { useEffect, useState } from 'react';
// import {
//   Box,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   IconButton,
//   TextField,
//   Typography,
//   Alert,
//   Snackbar,
//   CircularProgress,
//   Chip,
//   Menu,
//   MenuItem,
//   Paper,
// } from '@mui/material';
// import {
//   Add,
//   Edit,
//   Delete,
//   Refresh,
//   Today,
//   ChevronLeft,
//   ChevronRight,
//   AccessTime,
//   LocationOn,
//   Description,
//   MoreVert,
// } from '@mui/icons-material';
// import { useAppSelector } from '../store/hooks';
// import { googleCalendarService,type  CalendarEvent } from '../services/googleCalendarService'; 
// import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, parseISO } from 'date-fns';

// interface FullCalendarComponentProps {
//   calendarId?: string;
// }

// export default function FullCalendarComponent({ calendarId = 'primary' }: FullCalendarComponentProps) {
//   const { accessToken } = useAppSelector((state) => state.googleAuth);
//   const [events, setEvents] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [selectedEvent, setSelectedEvent] = useState<any>(null);
//   const [dialogOpen, setDialogOpen] = useState(false);
//   const [dialogMode, setDialogMode] = useState<'create' | 'edit'>('create');
//   const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });
//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
//   const [selectedEventForMenu, setSelectedEventForMenu] = useState<any>(null);
  
//   // Form state
//   const [eventForm, setEventForm] = useState<CalendarEvent>({
//     summary: '',
//     description: '',
//     location: '',
//     start: { dateTime: '', timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone },
//     end: { dateTime: '', timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone },
//   });

//   // Load events
//   const loadEvents = async () => {
//     if (!accessToken) return;
    
//     setLoading(true);
//     try {
//       const monthStart = startOfMonth(currentDate);
//       const monthEnd = endOfMonth(currentDate);
      
//       const fetchedEvents = await googleCalendarService.getEvents(
//         accessToken,
//         calendarId,
//         monthStart,
//         monthEnd
//       );
//       setEvents(fetchedEvents || []);
//     } catch (error: any) {
//       showSnackbar('Failed to load events: ' + error.message, 'error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (accessToken) {
//       loadEvents();
//     }
//   }, [accessToken, currentDate]);

//   // Get days in current month
//   const getDaysInMonth = () => {
//     const start = startOfMonth(currentDate);
//     const end = endOfMonth(currentDate);
//     return eachDayOfInterval({ start, end });
//   };

//   // Get events for a specific day
//   const getEventsForDay = (day: Date) => {
//     return events.filter(event => {
//       const eventStart = parseISO(event.start.dateTime || event.start.date);
//       return isSameMonth(eventStart, day) && 
//              format(eventStart, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd');
//     });
//   };

//   // Handle event click
//   const handleEventClick = (event: any, e: React.MouseEvent) => {
//     e.stopPropagation();
//     setSelectedEventForMenu(event);
//     setAnchorEl(e.currentTarget as HTMLElement);
//   };

//   // Handle create event
//   const handleCreateEvent = (day?: Date) => {
//     const now = new Date();
//     const startTime = day || new Date();
//     startTime.setHours(now.getHours(), 0, 0);
    
//     const endTime = new Date(startTime);
//     endTime.setHours(startTime.getHours() + 1);
    
//     setEventForm({
//       summary: '',
//       description: '',
//       location: '',
//       start: { 
//         dateTime: format(startTime, "yyyy-MM-dd'T'HH:mm:ss"), 
//         timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone 
//       },
//       end: { 
//         dateTime: format(endTime, "yyyy-MM-dd'T'HH:mm:ss"), 
//         timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone 
//       },
//     });
//     setDialogMode('create');
//     setDialogOpen(true);
//   };

//   // Handle edit event
//   const handleEditEvent = () => {
//     if (selectedEventForMenu) {
//       setEventForm({
//         summary: selectedEventForMenu.summary || '',
//         description: selectedEventForMenu.description || '',
//         location: selectedEventForMenu.location || '',
//         start: selectedEventForMenu.start,
//         end: selectedEventForMenu.end,
//       });
//       setDialogMode('edit');
//       setDialogOpen(true);
//     }
//     setAnchorEl(null);
//   };

//   // Handle delete event
//   const handleDeleteEvent = async () => {
//     if (!accessToken || !selectedEventForMenu) return;
    
//     try {
//       await googleCalendarService.deleteEvent(accessToken, calendarId, selectedEventForMenu.id);
//       showSnackbar('Event deleted successfully', 'success');
//       loadEvents();
//     } catch (error: any) {
//       showSnackbar('Failed to delete event: ' + error.message, 'error');
//     }
//     setAnchorEl(null);
//     setSelectedEventForMenu(null);
//   };

//   // Handle form submit
//   const handleSubmit = async () => {
//     if (!accessToken) return;
    
//     try {
//       if (dialogMode === 'create') {
//         await googleCalendarService.createEvent(accessToken, calendarId, eventForm);
//         showSnackbar('Event created successfully', 'success');
//       } else {
//         await googleCalendarService.updateEvent(accessToken, calendarId, selectedEventForMenu.id, eventForm);
//         showSnackbar('Event updated successfully', 'success');
//       }
//       setDialogOpen(false);
//       loadEvents();
//     } catch (error: any) {
//       showSnackbar('Failed to save event: ' + error.message, 'error');
//     }
//   };

//   const showSnackbar = (message: string, severity: 'success' | 'error') => {
//     setSnackbar({ open: true, message, severity });
//   };

//   // Navigate months
//   const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
//   const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));
//   const goToToday = () => setCurrentDate(new Date());

//   if (!accessToken) {
//     return (
//       <Box sx={{ p: 4, textAlign: 'center' }}>
//         <Alert severity="warning">
//           Please sign in with Google to access calendar
//         </Alert>
//       </Box>
//     );
//   }

//   const days = getDaysInMonth();

//   return (
//     <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', bgcolor: '#f5f5f5' }}>
//       {/* Header */}
//       <Paper elevation={2} sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//         <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
//           <IconButton onClick={prevMonth}>
//             <ChevronLeft />
//           </IconButton>
//           <Typography variant="h5" sx={{ minWidth: 200, textAlign: 'center' }}>
//             {format(currentDate, 'MMMM yyyy')}
//           </Typography>
//           <IconButton onClick={nextMonth}>
//             <ChevronRight />
//           </IconButton>
//           <Button startIcon={<Today />} onClick={goToToday} size="small">
//             Today
//           </Button>
//         </Box>
//         <Box sx={{ display: 'flex', gap: 1 }}>
//           <IconButton onClick={loadEvents} disabled={loading}>
//             <Refresh />
//           </IconButton>
//           <Button
//             variant="contained"
//             startIcon={<Add />}
//             onClick={() => handleCreateEvent()}
//           >
//             Create Event
//           </Button>
//         </Box>
//       </Paper>

//       {/* Calendar Grid */}
//       <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
//         {loading ? (
//           <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
//             <CircularProgress />
//           </Box>
//         ) : (
//           <Box
//             sx={{
//               display: 'grid',
//               gridTemplateColumns: 'repeat(7, 1fr)',
//               gap: 1,
//               height: '100%',
//             }}
//           >
//             {/* Weekday headers */}
//             {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
//               <Box
//                 key={day}
//                 sx={{
//                   p: 1,
//                   textAlign: 'center',
//                   fontWeight: 'bold',
//                   bgcolor: 'primary.main',
//                   color: 'white',
//                   borderRadius: 1,
//                 }}
//               >
//                 {day}
//               </Box>
//             ))}

//             {/* Calendar days */}
//             {days.map(day => {
//               const dayEvents = getEventsForDay(day);
//               const isCurrentMonth = isSameMonth(day, currentDate);
//               const isCurrentDay = isToday(day);

//               return (
//                 <Box
//                   key={day.toISOString()}
//                   onClick={() => handleCreateEvent(day)}
//                   sx={{
//                     minHeight: 120,
//                     p: 1,
//                     bgcolor: isCurrentMonth ? 'white' : '#fafafa',
//                     border: '1px solid',
//                     borderColor: isCurrentDay ? 'primary.main' : '#e0e0e0',
//                     borderRadius: 1,
//                     cursor: 'pointer',
//                     transition: 'all 0.2s',
//                     '&:hover': {
//                       transform: 'translateY(-2px)',
//                       boxShadow: 2,
//                       bgcolor: '#f5f5f5',
//                     },
//                   }}
//                 >
//                   <Typography
//                     variant="body2"
//                     sx={{
//                       fontWeight: isCurrentDay ? 'bold' : 'normal',
//                       color: isCurrentMonth ? 'text.primary' : 'text.disabled',
//                       textAlign: 'right',
//                     }}
//                   >
//                     {format(day, 'd')}
//                   </Typography>

//                   <Box sx={{ mt: 1, overflow: 'auto', maxHeight: 80 }}>
//                     {dayEvents.slice(0, 3).map(event => (
//                       <Box
//                         key={event.id}
//                         onClick={(e) => handleEventClick(event, e)}
//                         sx={{
//                           p: 0.5,
//                           mb: 0.5,
//                           bgcolor: 'primary.light',
//                           color: 'white',
//                           borderRadius: 1,
//                           fontSize: '0.75rem',
//                           cursor: 'pointer',
//                           whiteSpace: 'nowrap',
//                           overflow: 'hidden',
//                           textOverflow: 'ellipsis',
//                           '&:hover': { bgcolor: 'primary.main' },
//                         }}
//                       >
//                         {event.start.dateTime && format(parseISO(event.start.dateTime), 'h:mm a')} {event.summary}
//                       </Box>
//                     ))}
//                     {dayEvents.length > 3 && (
//                       <Typography variant="caption" color="text.secondary">
//                         +{dayEvents.length - 3} more
//                       </Typography>
//                     )}
//                   </Box>
//                 </Box>
//               );
//             })}
//           </Box>
//         )}
//       </Box>

//       {/* Event Menu */}
//       <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
//         <MenuItem onClick={handleEditEvent}>
//           <Edit sx={{ mr: 1 }} /> Edit
//         </MenuItem>
//         <MenuItem onClick={handleDeleteEvent} sx={{ color: 'error.main' }}>
//           <Delete sx={{ mr: 1 }} /> Delete
//         </MenuItem>
//       </Menu>

//       {/* Create/Edit Event Dialog */}
//       <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
//         <DialogTitle>{dialogMode === 'create' ? 'Create New Event' : 'Edit Event'}</DialogTitle>
//         <DialogContent>
//           <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
//             <TextField
//               label="Event Title"
//               fullWidth
//               value={eventForm.summary}
//               onChange={(e) => setEventForm({ ...eventForm, summary: e.target.value })}
//               required
//             />
//             <TextField
//               label="Location"
//               fullWidth
//               value={eventForm.location}
//               onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
//               InputProps={{ startAdornment: <LocationOn sx={{ mr: 1, color: 'action.active' }} /> }}
//             />
//             <TextField
//               label="Start Time"
//               type="datetime-local"
//               fullWidth
//               value={eventForm.start.dateTime.slice(0, 16)}
//               onChange={(e) => setEventForm({
//                 ...eventForm,
//                 start: { ...eventForm.start, dateTime: e.target.value }
//               })}
//               InputLabelProps={{ shrink: true }}
//             />
//             <TextField
//               label="End Time"
//               type="datetime-local"
//               fullWidth
//               value={eventForm.end.dateTime.slice(0, 16)}
//               onChange={(e) => setEventForm({
//                 ...eventForm,
//                 end: { ...eventForm.end, dateTime: e.target.value }
//               })}
//               InputLabelProps={{ shrink: true }}
//             />
//             <TextField
//               label="Description"
//               fullWidth
//               multiline
//               rows={4}
//               value={eventForm.description}
//               onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
//               InputProps={{ startAdornment: <Description sx={{ mr: 1, color: 'action.active' }} /> }}
//             />
//           </Box>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
//           <Button onClick={handleSubmit} variant="contained" color="primary">
//             {dialogMode === 'create' ? 'Create' : 'Save Changes'}
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Snackbar for notifications */}
//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={6000}
//         onClose={() => setSnackbar({ ...snackbar, open: false })}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
//       >
//         <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// }