import { bookColumns } from '@/components/dataTable/bookColumns';
import { DataTable } from '@/components/dataTable/dataTable';
import { TBook } from '@/types/data';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

export default async function Home() {
  try {
    const res = await fetch('http://localhost:5250/api/book', {
      method: 'GET',
    });
    const data: TBook[] = await res.json();
    return (
      <div className="m-6 p-4">
        <Suspense fallback={'loading books...'}>
          <DataTable columns={bookColumns} data={data} />
        </Suspense>
      </div>
    );
  } catch (error) {
    return (
      <div className="flex justify-center m-6 p-4">Unable to fetch books</div>
    );
  }
}
