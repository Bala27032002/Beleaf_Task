import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Typography,
  Box,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import '../Assest/Css/DataTable.css';
import { CircularProgress } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';



const DataTable = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState(null);
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState({ _id: '', title: '', body: '' });
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const BaseURL = 'http://localhost:8000/api/posts';

  useEffect(() => {
    fetchPosts();
  }, []);

  //fetchData
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(BaseURL);
      setPosts(res.data);
    } catch (err) {
      console.error('Failed to fetch posts', err);
    }
    finally {
      setLoading(false);
    }

  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleEdit = (post) => {
    setEditData(post);
    setOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({ ...prevData, [name]: value }));
  };

  //Update Function
  const handleUpdate = async () => {
    try {
      await axios.put(`${BaseURL}/${editData._id}`, editData);

      setOpen(false);
      fetchPosts();
      showSnackbar('Updated successfully!', 'success');
    } catch (error) {
      console.error('Failed to update', error);
      alert('Update failed!');
    }
  };

  const handleDeleteClick = (id) => {
    setSelectedDeleteId(id);
    setDeleteDialogOpen(true);
  };

  //Delete function
  const handleDelete = async () => {
    try {
      await axios.delete(`${BaseURL}/${selectedDeleteId}`);
      setDeleteDialogOpen(false);
      fetchPosts();
      showSnackbar('Deleted successfully!', 'success');

    } catch (error) {
      console.error('Delete error', error);
    }
  };

  //Alert message
  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (

    <Box className="custom-table-container" p={4}>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
          <CircularProgress />loading
        </Box>
      ) : (
        <TableContainer sx={{
          maxWidth: '1000px',
          margin: 'auto',
          overflowX: 'auto'
        }} component={Paper} elevation={3} className="gradient-table-wrapper">
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell className="table-header-cell"><strong>ID</strong></TableCell>
                <TableCell className="table-header-cell"><strong>Title</strong></TableCell>
                <TableCell className="table-header-cell"><strong>Body</strong></TableCell>
                <TableCell className="table-header-cell"><strong>Action</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {posts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((post, index) => (
                <TableRow key={post._id}>
                  <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                  <TableCell>{post.title}</TableCell>
                  <TableCell>{post.body}</TableCell>
                  <TableCell>
                    <IconButton
                      className="icon-btn"
                      onClick={() => handleEdit(post)}
                      style={{ backgroundColor: '#02c7ab', color: 'white', marginRight: '5px', borderRadius: '11px' }} // Blue
                    >
                      <EditIcon />
                    </IconButton>

                    <IconButton
                      className="icon-btn"
                      onClick={() => handleDeleteClick(post._id)}
                      style={{ backgroundColor: '#d32f2f', color: 'white', borderRadius: '11px', marginTop: '5px', }} // Red
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[10]}
            component="div"
            count={posts.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
          />
        </TableContainer>
      )}
      <Typography align="center" className="footer-text">
        Made with by BeLeaf
      </Typography>

      {/* Edit Modal */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Edit Post</DialogTitle>
        <DialogContent>
          <TextField
            name="title"
            label="Title"
            fullWidth
            margin="dense"
            value={editData.title}
            onChange={handleEditChange}
          />
          <TextField
            name="body"
            label="Body"
            fullWidth
            multiline
            rows={4}
            margin="dense"
            value={editData.body}
            onChange={handleEditChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleUpdate} variant="contained" style={{ backgroundColor: '#00c9a7', color: '#fff' }}>
            Update
          </Button>
        </DialogActions>
      </Dialog>


      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this post?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>No</Button>
          <Button onClick={handleDelete} variant="contained" style={{ backgroundColor: '#f44336', color: '#fff' }}>
            Yes, Delete
          </Button>
        </DialogActions>
      </Dialog>



      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <MuiAlert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }} elevation={6} variant="filled">
          {snackbar.message}
        </MuiAlert>
      </Snackbar>



    </Box>
  );
};

export default DataTable;
