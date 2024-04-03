'use client';

import { TAuthor, TBook } from '@/types/data';
import { ColumnDef } from '@tanstack/react-table';

import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '../ui/dialog';
import { useState } from 'react';
import UpdateBookDialog from '../updateBookDialog';
import DeleteBookDialog from '../deleteBookDialog';

export const bookColumns: ColumnDef<TBook>[] = [
  {
    accessorKey: 'title',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'authors',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Authors
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const authorList = row.getValue<TAuthor[]>('authors');
      return authorList.map((author) => (
        <p key={author.id}>
          {author.firstName} {author.lastName}
        </p>
      ));
    },
  },
  {
    accessorKey: 'genre',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Genre
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'pages',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Pages
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'quantity',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Quantity
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      enum Dialogs {
        updateBookDialog = 'update',
        deleteBookDialog = 'delete',
      }

      const [dialog, setDialog] = useState('');

      const book = row.original;
      return (
        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DialogTrigger
                asChild
                onClick={() => setDialog(Dialogs.updateBookDialog)}
              >
                <DropdownMenuItem className="hover:cursor-pointer">
                  Update Book
                </DropdownMenuItem>
              </DialogTrigger>
              <DialogTrigger
                asChild
                onClick={() => setDialog(Dialogs.deleteBookDialog)}
              >
                <DropdownMenuItem className="text-red-500 hover:cursor-pointer">
                  Delete Book
                </DropdownMenuItem>
              </DialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>

          <DialogContent>
            {dialog == Dialogs.updateBookDialog ? (
              <UpdateBookDialog book={book} />
            ) : (
              <DeleteBookDialog bookId={book.id} />
            )}
          </DialogContent>
        </Dialog>
      );
    },
  },
];
