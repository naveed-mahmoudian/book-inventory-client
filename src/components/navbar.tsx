'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <div className="flex justify-center items-center gap-6 p-4">
      <Link
        href="/"
        className={
          pathname == '/'
            ? 'pointer-events-none underline font-bold'
            : 'hover:underline'
        }
      >
        Search Books
      </Link>
      <Link
        href="/authors"
        className={
          pathname == '/authors'
            ? 'pointer-events-none underline font-bold'
            : 'hover:underline'
        }
      >
        Search Authors
      </Link>
    </div>
  );
}
