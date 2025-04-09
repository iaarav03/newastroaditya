import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Chip,
  IconButton,
  TextField,
  InputAdornment,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Menu,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent
} from '@mui/material';
import {
  Search,
  MoreVertical,
  Edit,
  Trash2
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { EditProfileDialog } from '@/components/admin/dialogs/EditProfileDialog';
import { User } from '@/types/user';

// Extended User type to include superadmin role and permissions
interface AdminUser extends Omit<User, 'role'> {
  role: 'admin' | 'superadmin';
  permissions?: string[];
}

interface AdminManagementProps {
  onError: (message: string) => void;
  onSuccess: (message: string) => void;
  clearMessages: () => void;
}

export default function AdminManagement({ onError, onSuccess, clearMessages }: AdminManagementProps) {
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [processingAction, setProcessingAction] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedAdmin, setSelectedAdmin] = useState<AdminUser | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    clearMessages();
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/superadmin/admins`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch admins');
      }

      const data = await response.json();
      setAdmins(data);
    } catch (err) {
      console.error('Error fetching admins:', err);
      onError('Failed to load admins');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAdmin = async () => {
    if (!selectedAdmin) return;
    
    setProcessingAction(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/superadmin/admins/${selectedAdmin._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to delete admin');
      }
      
      onSuccess('Admin deleted successfully');
      fetchAdmins();
    } catch (err: any) {
      console.error('Error deleting admin:', err);
      onError(err.message || 'Failed to delete admin');
    } finally {
      setProcessingAction(false);
      setConfirmDeleteOpen(false);
      setAnchorEl(null);
    }
  };

  const filteredAdmins = admins.filter(admin => 
    searchTerm === '' || 
    admin.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6">
          Admin Management
        </Typography>
      </Box>
      
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search admins by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <TableContainer component={Paper}>
        {isLoading ? (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <CircularProgress />
          </Box>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Permissions</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredAdmins.map((admin) => (
                <TableRow key={admin._id}>
                  <TableCell>{admin.name}</TableCell>
                  <TableCell>{admin.email}</TableCell>
                  <TableCell>
                    <Chip 
                      color={admin.role === 'superadmin' ? 'primary' : 'default'}
                      label={admin.role.charAt(0).toUpperCase() + admin.role.slice(1)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                      <Chip 
                        label="Admin Permissions" 
                        color="primary"
                        size="small"
                        sx={{ fontWeight: 'medium' }}
                      />
                    </Box>
                  </TableCell>
                  <TableCell>
                    <IconButton 
                      onClick={(e) => {
                        setSelectedAdmin(admin);
                        setAnchorEl(e.currentTarget);
                      }}
                      disabled={admin.role === 'superadmin'} // Disable actions for superadmins
                    >
                      <MoreVertical />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={() => {
          setEditDialogOpen(true);
          setAnchorEl(null);
        }}>
          <Edit className="w-4 h-4 mr-2" /> Edit Profile
        </MenuItem>
        
        <MenuItem 
          onClick={() => {
            setConfirmDeleteOpen(true);
            setAnchorEl(null);
          }}
          sx={{ color: 'error.main' }}
        >
          <Trash2 className="w-4 h-4 mr-2" /> Delete Admin
        </MenuItem>
      </Menu>

      {/* Confirmation Dialog for Delete */}
      <Dialog
        open={confirmDeleteOpen}
        onClose={() => setConfirmDeleteOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete admin <strong>{selectedAdmin?.name}</strong>? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDeleteOpen(false)}>Cancel</Button>
          <Button 
            onClick={handleDeleteAdmin} 
            color="error"
            disabled={processingAction}
          >
            {processingAction ? <CircularProgress size={24} /> : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Profile Dialog */}
      <EditProfileDialog 
        open={editDialogOpen} 
        onClose={() => setEditDialogOpen(false)}
        user={selectedAdmin as User}
        onUpdate={fetchAdmins}
      />
    </Box>
  );
} 