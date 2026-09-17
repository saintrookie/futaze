import { useEffect, useMemo, useState } from 'react';
import { Search, LayoutList, List as ListIcon } from 'lucide-react';
import { Input, Checkbox } from '@shared/ui/atoms/FormControls';
import { Pagination } from '@shared/ui/molecules/Pagination';
import { EmptyState } from '@shared/ui/patterns/EmptyState';
import { Skeleton } from '@shared/ui/atoms/Feedback';
import { Button, IconButton } from '@shared/ui/atoms/Button';
import { Text } from '@shared/ui/atoms/Typography';
import { useI18n } from '@shared/i18n/LocaleProvider';
import { cn } from '@shared/lib/cn';

const PAGE_SIZE = 8;

/**
 * Below `sm`, rows render as stacked cards (first column as title, the rest
 * as label:value pairs) instead of shrinking the table into a horizontal
 * scroll — a real mobile transformation of the information, not the same
 * table at a smaller size.
 */
function MobileRow({ row, columns, rowActions, selectable, selected, onToggle }) {
  const [primary, ...rest] = columns;
  return (
    <div className="flex flex-col gap-2 border-b border-separator p-4 last:border-0">
      <div className="flex items-start gap-3">
        {selectable && <Checkbox checked={selected} onChange={() => onToggle(row.id)} className="mt-0.5" />}
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-foreground">{primary.render ? primary.render(row) : row[primary.key]}</p>
          {rest.length > 0 && (
            <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1">
              {rest.map((col) => (
                <div key={col.key} className="flex items-center gap-1 text-xs">
                  <span className="text-muted">{col.label}:</span>
                  <span className="text-foreground">{col.render ? col.render(row) : row[col.key]}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {rowActions && <div className="flex justify-end">{rowActions(row)}</div>}
    </div>
  );
}

/**
 * `selectable`/`bulkActions` and `enableDensityToggle` are opt-in and off by
 * default, so existing call sites render exactly as before; only the sticky
 * header and mobile card layout apply unconditionally, as pure UX upgrades.
 */
export function DataTable({
  columns,
  rows,
  searchKeys = [],
  loading,
  emptyTitle,
  emptyDescription,
  rowActions,
  toolbar,
  selectable = false,
  bulkActions,
  enableDensityToggle = false,
}) {
  const { t } = useI18n();
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(() => new Set());
  const [density, setDensity] = useState('comfortable');

  const filtered = useMemo(() => {
    if (!query) return rows;
    const q = query.toLowerCase();
    return rows.filter((row) => searchKeys.some((key) => String(row[key] ?? '').toLowerCase().includes(q)));
  }, [rows, query, searchKeys]);

  useEffect(() => {
    setSelected(new Set());
  }, [query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const selectedRows = rows.filter((r) => selected.has(r.id));
  const allPagedSelected = paged.length > 0 && paged.every((r) => selected.has(r.id));
  const rowPadding = density === 'compact' ? 'py-2' : 'py-3.5';

  const toggleRow = (id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAllPaged = () => {
    setSelected((prev) => {
      const next = new Set(prev);
      paged.forEach((r) => (allPagedSelected ? next.delete(r.id) : next.add(r.id)));
      return next;
    });
  };

  return (
    <div className="rounded-xl border border-border bg-surface-elevated">
      <div className="flex flex-col gap-3 border-b border-separator p-4 sm:flex-row sm:items-center sm:justify-between">
        {selectable && selected.size > 0 ? (
          <div className="flex w-full flex-wrap items-center gap-3">
            <Text size="sm" className="font-medium">
              {t('table.selectedCount', { count: selected.size })}
            </Text>
            <Button variant="ghost" size="xs" onClick={() => setSelected(new Set())}>
              {t('table.clearSelection')}
            </Button>
            <div className="ml-auto flex flex-wrap items-center gap-2">
              {bulkActions?.map((action) => (
                <Button
                  key={action.label}
                  variant={action.variant || 'secondary'}
                  size="sm"
                  iconLeft={action.icon}
                  onClick={() => {
                    action.onClick(selectedRows);
                    setSelected(new Set());
                  }}
                >
                  {action.label}
                </Button>
              ))}
            </div>
          </div>
        ) : (
          <>
            <div className="relative w-full sm:max-w-xs">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
              <Input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPage(1);
                }}
                placeholder={t('table.searchPlaceholder')}
                size="sm"
                className="pl-9"
              />
            </div>
            <div className="flex items-center gap-2">
              {enableDensityToggle && (
                <div className="flex items-center gap-0.5 rounded-md border border-border p-0.5">
                  <IconButton
                    label={t('table.comfortable')}
                    size="sm"
                    variant={density === 'comfortable' ? 'secondary' : 'ghost'}
                    onClick={() => setDensity('comfortable')}
                  >
                    <LayoutList />
                  </IconButton>
                  <IconButton
                    label={t('table.compact')}
                    size="sm"
                    variant={density === 'compact' ? 'secondary' : 'ghost'}
                    onClick={() => setDensity('compact')}
                  >
                    <ListIcon />
                  </IconButton>
                </div>
              )}
              {toolbar}
            </div>
          </>
        )}
      </div>

      {loading ? (
        <div className="flex flex-col gap-3 p-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="p-4">
          <EmptyState icon={<Search />} title={emptyTitle || t('table.noneFoundTitle')} description={emptyDescription} />
        </div>
      ) : (
        <>
          <div className="sm:hidden">
            {paged.map((row) => (
              <MobileRow
                key={row.id}
                row={row}
                columns={columns}
                rowActions={rowActions}
                selectable={selectable}
                selected={selected.has(row.id)}
                onToggle={toggleRow}
              />
            ))}
          </div>

          <div className="hidden max-h-[32rem] overflow-auto sm:block">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="sticky top-0 z-10 border-b border-separator bg-surface-elevated text-xs uppercase tracking-wide text-muted">
                  {selectable && (
                    <th className="w-10 px-4 py-3">
                      <Checkbox checked={allPagedSelected} onChange={toggleAllPaged} aria-label={t('table.selectAll')} />
                    </th>
                  )}
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
                    {selectable && (
                      <td className={cn('px-4', rowPadding)}>
                        <Checkbox checked={selected.has(row.id)} onChange={() => toggleRow(row.id)} aria-label={t('table.selectRow')} />
                      </td>
                    )}
                    {columns.map((col) => (
                      <td key={col.key} className={cn('whitespace-nowrap px-4 text-foreground', rowPadding)}>
                        {col.render ? col.render(row) : row[col.key]}
                      </td>
                    ))}
                    {rowActions && <td className={cn('px-4 text-right', rowPadding)}>{rowActions(row)}</td>}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {totalPages > 1 && (
        <div className="border-t border-separator p-4">
          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        </div>
      )}
    </div>
  );
}
