'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

export default function DeleteBookDialog({ bookId }: { bookId: string }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteBook = async () => {
    setIsLoading(true);

    try {
      const res = await fetch(`http://localhost:5250/api/book/${bookId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
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
        <DialogTitle>Delete Book</DialogTitle>
      </DialogHeader>
      <DialogDescription>
        This action cannot be undone. Are you sure you want to permanently
        delete this book?
      </DialogDescription>
      <DialogFooter>
        <DialogClose asChild>
          <Button>Cancel</Button>
        </DialogClose>
        <Button
          disabled={isLoading}
          onClick={handleDeleteBook}
          variant="destructive"
        >
          Delete Book
        </Button>
      </DialogFooter>
    </>
  );
}
