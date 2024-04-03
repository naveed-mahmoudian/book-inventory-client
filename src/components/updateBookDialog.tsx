'use client';

import { TBook, TBookData } from '@/types/data';
import { DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useState } from 'react';

export default function UpdateBookDialog({ book }: { book: TBook }) {
  const [bookData, setBookData] = useState({
    title: book.title,
    authors: book.authors
      .map((author) => `${author.firstName} ${author.lastName}`)
      .join(', '),
    genre: book.genre,
    pages: book.pages,
    quantity: book.quantity,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateBook = async () => {
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
      const res = await fetch(`http://localhost:5250/api/book/${book.id}`, {
        method: 'PUT',
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
    <>
      <DialogHeader>
        <DialogTitle>Update Book</DialogTitle>
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
          onChange={(e) => setBookData({ ...bookData, title: e.target.value })}
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
          onChange={(e) => setBookData({ ...bookData, genre: e.target.value })}
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
          onClick={handleUpdateBook}
          variant="default"
          className="mt-4"
        >
          Update Book
        </Button>
      </div>
    </>
  );
}
