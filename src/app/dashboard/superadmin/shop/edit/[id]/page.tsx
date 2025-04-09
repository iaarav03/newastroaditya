'use client'
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Paper,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  CircularProgress,
  Alert,
  Chip,
  Stack,
  IconButton,
} from '@mui/material';
import { useAuth } from '@/hooks/useAuth';
import { Save, ArrowLeft, X } from 'lucide-react';

interface ShopItem {
  _id: string;
  itemName: string;
  description: string;
  category: string;
  price: number;
  discountedPrice?: number;
  stock: number;
  featured?: boolean;
  tags?: string[];
  rating: number;
  totalRatings: number;
  shopName: string;
  userId: string;
}

export default function EditShopItem() {
  const router = useRouter();
  const params = useParams();
  const { user, loading } = useAuth();
  const itemId = params.id as string;
  
  const [formData, setFormData] = useState({
    itemName: '',
    description: '',
    category: '',
    price: '',
    discountedPrice: '',
    stock: '',
    tags: [] as string[],
    featured: false,
    shopName: 'Astro Shop',
    userId: '',
  });
  
  const [errors, setErrors] = useState({
    itemName: '',
    description: '',
    category: '',
    price: '',
    stock: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [currentTag, setCurrentTag] = useState('');
  
  const categories = ['Bracelets', 'Gemstone', 'Rudraksha', 'Crystal', 'Kawach'];
  
  useEffect(() => {
    if (!loading && (!user || user.role !== 'superadmin')) {
      router.push('/dashboard');
      return;
    }
    
    if (user && user.role === 'superadmin' && itemId) {
      fetchShopItem();
    }
  }, [user, loading, router, itemId]);
  
  const fetchShopItem = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/shop/${itemId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch shop item');
      }
      
      const data: ShopItem = await response.json();
      
      setFormData({
        itemName: data.itemName,
        description: data.description || '',
        category: data.category,
        price: data.price.toString(),
        discountedPrice: data.discountedPrice ? data.discountedPrice.toString() : '',
        stock: data.stock.toString(),
        tags: data.tags || [],
        featured: data.featured || false,
        shopName: data.shopName || 'Astro Shop',
        userId: data.userId || user?._id || '',
      });
    } catch (err: any) {
      console.error('Error fetching shop item:', err);
      setError(err.message || 'Failed to fetch shop item');
    } finally {
      setIsLoading(false);
    }
  };
  
  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      itemName: '',
      description: '',
      category: '',
      price: '',
      stock: '',
    };
    
    if (!formData.itemName.trim()) {
      newErrors.itemName = 'Item name is required';
      isValid = false;
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
      isValid = false;
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required';
      isValid = false;
    }
    
    if (!formData.price.trim()) {
      newErrors.price = 'Price is required';
      isValid = false;
    } else if (isNaN(Number(formData.price)) || Number(formData.price) < 0) {
      newErrors.price = 'Price must be a valid positive number';
      isValid = false;
    }
    
    if (!formData.stock.trim()) {
      newErrors.stock = 'Stock is required';
      isValid = false;
    } else if (isNaN(Number(formData.stock)) || Number(formData.stock) < 0) {
      newErrors.stock = 'Stock must be a valid non-negative number';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when field is edited
    if (errors[name as keyof typeof errors]) {
      setErrors({ ...errors, [name]: '' });
    }
  };
  
  const handleCategoryChange = (e: any) => {
    setFormData({ ...formData, category: e.target.value });
    if (errors.category) {
      setErrors({ ...errors, category: '' });
    }
  };
  
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // Removed
  };
  
  const removeImage = (index: number) => {
    // Removed
  };
  
  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, currentTag.trim()]
      });
      setCurrentTag('');
    }
  };
  
  const removeTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(t => t !== tag)
    });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setError('');
    setSuccess('');
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/shop/${itemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          itemName: formData.itemName,
          description: formData.description,
          category: formData.category,
          price: Number(formData.price),
          discountedPrice: formData.discountedPrice ? Number(formData.discountedPrice) : undefined,
          stock: Number(formData.stock),
          images: [],  // Empty array for images
          tags: formData.tags,
          featured: formData.featured,
          shopName: formData.shopName,
          userId: formData.userId || user?._id
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to update item');
      }
      
      setSuccess('Item updated successfully!');
      
      // Redirect to shop management after a delay
      setTimeout(() => {
        router.push('/dashboard/superadmin');
        router.refresh();
      }, 2000);
      
    } catch (err: any) {
      console.error('Error updating shop item:', err);
      setError(err.message || 'Failed to update item. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (loading || isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }
  
  return (
    <Container maxWidth="lg">
      <Box mb={3} display="flex" alignItems="center">
        <Button
          startIcon={<ArrowLeft />}
          onClick={() => router.back()}
          sx={{ mr: 2 }}
        >
          Back
        </Button>
        <Typography variant="h5">Edit Shop Item</Typography>
      </Box>
      
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
      
      <Paper elevation={3} sx={{ p: 3 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Item Name"
                name="itemName"
                value={formData.itemName}
                onChange={handleChange}
                error={!!errors.itemName}
                helperText={errors.itemName}
                required
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                error={!!errors.description}
                helperText={errors.description}
                multiline
                rows={4}
                required
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth error={!!errors.category}>
                <InputLabel>Category</InputLabel>
                <Select
                  value={formData.category}
                  onChange={handleCategoryChange}
                  label="Category"
                  required
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>{category}</MenuItem>
                  ))}
                </Select>
                {errors.category && (
                  <Typography color="error" variant="caption" sx={{ ml: 2, mt: 0.5 }}>
                    {errors.category}
                  </Typography>
                )}
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Stock"
                name="stock"
                type="number"
                value={formData.stock}
                onChange={handleChange}
                error={!!errors.stock}
                helperText={errors.stock}
                required
                InputProps={{
                  inputProps: { min: 0 }
                }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                error={!!errors.price}
                helperText={errors.price}
                required
                InputProps={{
                  startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                  inputProps: { min: 0 }
                }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Discounted Price (Optional)"
                name="discountedPrice"
                type="number"
                value={formData.discountedPrice}
                onChange={handleChange}
                InputProps={{
                  startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                  inputProps: { min: 0 }
                }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>Tags</Typography>
              <Box display="flex" alignItems="center" mb={2}>
                <TextField
                  label="Add a tag"
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  size="small"
                  sx={{ mr: 1 }}
                />
                <Button variant="outlined" onClick={addTag}>Add</Button>
              </Box>
              
              <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 2 }}>
                {formData.tags.map((tag, index) => (
                  <Chip
                    key={index}
                    label={tag}
                    onDelete={() => removeTag(tag)}
                    sx={{ m: 0.5 }}
                  />
                ))}
              </Stack>
            </Grid>
            
            <Grid item xs={12}>
              <Box display="flex" justifyContent="flex-end" mt={2}>
                <Button
                  variant="contained"
                  type="submit"
                  disabled={isSubmitting}
                  startIcon={isSubmitting ? <CircularProgress size={20} /> : <Save />}
                  sx={{ minWidth: 150 }}
                >
                  {isSubmitting ? 'Updating...' : 'Update Item'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
} 