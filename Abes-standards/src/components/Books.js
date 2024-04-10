import React, { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { TextField, Button, Container, Box, List, ListItem, ListItemText, Typography } from '@mui/material';
import backgroundImg from '../assets/Books.jpg';

const Books = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [dateFinished, setDateFinished] = useState('');
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const booksRef = query(collection(db, 'books'), orderBy('dateFinished'));
    const unsubscribe = onSnapshot(booksRef, (snapshot) => {
      const booksData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        dateFinished: doc.data().dateFinished?.toDate().toLocaleDateString('en-US'),
      }));
      setBooks(booksData);
    });

    return unsubscribe;
  }, []);



  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, 'books'), {
        title,
        author,
        dateFinished: new Date(dateFinished),
      });

      setTitle('');
      setAuthor('');
      setDateFinished('');
    } catch (error) {
      console.error('Error adding document:', error);
    }
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        padding: 3,
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(5px)',
          borderRadius: 1,
          padding: 2,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Add a New Book
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Book Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Date Finished"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            value={dateFinished}
            onChange={(e) => setDateFinished(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Add Book
          </Button>
        </Box>
        <Typography variant="h5" gutterBottom>
          Book List
        </Typography>
        <List>
          {books.map((book) => (
            <ListItem key={book.id}>
              <ListItemText
                primary={book.title}
                secondary={`Author: ${book.author}, Date Finished: ${book.dateFinished}`}
              />
            </ListItem>
          ))}
        </List>
      </Container>
    </Box>
  );
};

export default Books;
