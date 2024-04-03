'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { TBookData } from '@/types/data';

export default function AddBookDialog() {
  const [bookData, setBookData] = useState({
    title: '',
    authors: '',
    genre: '',
    pages: 0,
    quantity: 1,
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleAddBook = async () => {
    setIsLoading(true);

    if (
      bookData.title === '' ||
      bookData.authors === '' ||
      bookData.genre === '' ||
      bookData.quantity <= 0 ||
      bookData.pages <= 0
    ) {
      setIsLoading(false);
      return;
    }

    const authors = [];
    const names = bookData.authors.split(',').map((name) => name.trim());

    for (const fullName of names) {
      const [firstName, lastName] = fullName.split(' ');
      authors.push({ firstName, lastName });
    }

    const payload: TBookData = {
      title: bookData.title,
      authors: authors,
      genre: bookData.genre,
      pages: bookData.pages,
      quantity: bookData.quantity,
    };

    try {
      const res = await fetch('http://localhost:5250/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      setIsLoading(false);
      return location.reload();
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Book</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Book</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 p-4">
          <Label htmlFor="title" className="text-start">
            Title
          </Label>
          <Input
            type="text"
            id="title"
            placeholder="Title"
            value={bookData.title}
            onChange={(e) =>
              setBookData({ ...bookData, title: e.target.value })
            }
          />
          <Label htmlFor="authors" className="text-start">
            Authors
          </Label>
          <Input
            type="text"
            id="authors"
            placeholder="Authors"
            value={bookData.authors}
            onChange={(e) =>
              setBookData({ ...bookData, authors: e.target.value })
            }
          />
          <DialogDescription>
            Enter your author's first and last names separated by a comma. ex:
            John Smith, Jane Doe, Phil Green
          </DialogDescription>
          <Label htmlFor="genre" className="text-start">
            Genres
          </Label>
          <Input
            type="text"
            id="genre"
            placeholder="Genre"
            value={bookData.genre}
            onChange={(e) =>
              setBookData({ ...bookData, genre: e.target.value })
            }
          />
          <Label htmlFor="pages" className="text-start">
            Pages
          </Label>
          <Input
            type="number"
            id="pages"
            placeholder="Pages"
            value={bookData.pages}
            onChange={(e) =>
              setBookData({ ...bookData, pages: parseInt(e.target.value) })
            }
          />
          <Label htmlFor="quantity" className="text-start">
            Quantity
          </Label>
          <Input
            type="number"
            id="quantity"
            placeholder="Quantity"
            value={bookData.quantity}
            onChange={(e) =>
              setBookData({ ...bookData, quantity: parseInt(e.target.value) })
            }
          />
          <Button
            disabled={isLoading}
            onClick={handleAddBook}
            variant="default"
            className="mt-4"
          >
            Add Book
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
