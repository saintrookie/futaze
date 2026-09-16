import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@shared/ui/atoms/FormControls';
import { Pagination } from '@shared/ui/molecules/Pagination';
import { EmptyState } from '@shared/ui/patterns/EmptyState';
import { Skeleton } from '@shared/ui/atoms/Feedback';

const PAGE_SIZE = 8;

export function DataTable({ columns, rows, searchKeys = [], loading, emptyTitle = 'Nothing here yet', emptyDescription, rowActions, toolbar }) {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    if (!query) return rows;
    const q = query.toLowerCase();
    return rows.filter((row) => searchKeys.some((key) => String(row[key] ?? '').toLowerCase().includes(q)));
  }, [rows, query, searchKeys]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="rounded-xl border border-border bg-surface-elevated">
      <div className="flex flex-col gap-3 border-b border-separator p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
          <Input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder="Search…"
            size="sm"
            className="pl-9"
          />
        </div>
        {toolbar}
      </div>

      {loading ? (
        <div className="flex flex-col gap-3 p-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="p-4">
          <EmptyState icon={<Search />} title={emptyTitle} description={emptyDescription} />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-separator text-xs uppercase tracking-wide text-muted">
                {columns.map((col) => (
                  <th key={col.key} className="whitespace-nowrap px-4 py-3 font-medium">
                    {col.label}
                  </th>
                ))}
                {rowActions && <th className="px-4 py-3" />}
              </tr>
            </thead>
            <tbody>
              {paged.map((row) => (
                <tr key={row.id} className="border-b border-separator last:border-0 hover:bg-surface transition-colors duration-fast">
                  {columns.map((col) => (
                    <td key={col.key} className="whitespace-nowrap px-4 py-3.5 text-foreground">
                      {col.render ? col.render(row) : row[col.key]}
                    </td>
                  ))}
                  {rowActions && <td className="px-4 py-3.5 text-right">{rowActions(row)}</td>}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {totalPages > 1 && (
        <div className="border-t border-separator p-4">
          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        </div>
      )}
    </div>
  );
}
