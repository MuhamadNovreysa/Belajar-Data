import { Skeleton } from '@/components/ui/Skeleton';

export default function DailyLoading() {
  return (
    <div className="min-h-screen py-4">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <Skeleton variant="text" width="300px" height="32px" />
            <Skeleton variant="text" width="200px" height="20px" className="mt-1" />
          </div>
          <div className="flex gap-2">
            <Skeleton variant="rect" width="80px" height="36px" className="rounded-lg" />
            <Skeleton variant="rect" width="80px" height="36px" className="rounded-lg" />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} variant="rect" height="72px" className="rounded-lg" />
          ))}
        </div>

        <Skeleton variant="rect" height="60px" className="rounded-xl mt-4" />
        <Skeleton variant="rect" height="60px" className="rounded-xl mt-4" />

        <div className="mt-4">
          <div className="flex gap-2 mb-4">
            {Array.from({ length: 7 }).map((_, i) => (
              <Skeleton key={i} variant="rect" width="120px" height="40px" className="rounded-lg" />
            ))}
          </div>
          <div className="space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} variant="card" height="120px" className="rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
