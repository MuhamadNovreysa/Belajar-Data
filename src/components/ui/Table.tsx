import { ReactNode } from 'react';
import { cn } from '@/lib/utils/helpers';

export interface TableColumn<T = any> {
  key: string;
  header: ReactNode;
  render?: (item: T, index: number) => ReactNode;
  align?: 'left' | 'center' | 'right';
  width?: string | number;
  className?: string;
  sortable?: boolean;
  sortKey?: string;
}

export interface TableProps<T = any> {
  columns: TableColumn<T>[];
  data: T[];
  loading?: boolean;
  emptyMessage?: ReactNode;
  onRowClick?: (item: T, index: number) => void;
  rowClassName?: string | ((item: T, index: number) => string);
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
  rowKey?: (item: T) => string;
}

export function Table<T extends Record<string, any>>({
  columns,
  data,
  loading = false,
  emptyMessage = 'Tidak ada data',
  onRowClick,
  rowClassName,
  className,
  headerClassName,
  bodyClassName,
  rowKey = (item) => item.id?.toString() || '',
}: TableProps<T>) {
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  if (loading) {
    return (
      <div className="w-full">
        <div className="animate-pulse">
          <div className="h-10 bg-gray-200 rounded-t-lg mb-2" />
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-12 bg-gray-100 rounded mb-2" />
          ))}
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="w-full text-center py-12 text-gray-500">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className={cn('w-full overflow-x-auto', className)}>
      <table className="w-full border-collapse">
        <thead className={cn('bg-gray-50 border-b border-gray-200', headerClassName)}>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className={cn(
                  'px-4 py-3 text-sm font-semibold text-gray-700',
                  alignClasses[col.align || 'left'],
                  col.className
                )}
                style={{ width: col.width }}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={cn('divide-y divide-gray-100', bodyClassName)}>
          {data.map((item, index) => {
            const isClickable = !!onRowClick;
            const customRowClassName = typeof rowClassName === 'function'
              ? rowClassName(item, index)
              : rowClassName;

            return (
              <tr
                key={rowKey(item) || index}
                className={cn(
                  'transition-colors',
                  isClickable && 'cursor-pointer hover:bg-gray-50',
                  customRowClassName
                )}
                onClick={() => onRowClick?.(item, index)}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={cn(
                      'px-4 py-3 text-sm text-gray-700',
                      alignClasses[col.align || 'left'],
                      col.className
                    )}
                  >
                    {col.render ? col.render(item, index) : item[col.key]}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
