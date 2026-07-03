import { Skeleton } from '@/components/ui/Skeleton';

export default function AnalyticsLoading() {
  return (
    <div className="min-h-screen py-8">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <Skeleton variant="text" width="300px" height="32px" />
            <Skeleton variant="text" width="200px" height="20px" className="mt-1" />
          </div>
          <div className="flex gap-3">
            <Skeleton variant="rect" width="140px" height="40px" className="rounded-lg" />
            <Skeleton variant="rect" width="80px" height="40px" className="rounded-lg" />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} variant="card" height="100px" className="rounded-xl" />
          ))}
        </div>

        <div className="flex gap-2 mb-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} variant="rect" width="120px" height="40px" className="rounded-lg" />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton variant="card" height="350px" className="rounded-xl" />
          <Skeleton variant="card" height="350px" className="rounded-xl" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <Skeleton variant="card" height="300px" className="rounded-xl" />
          <Skeleton variant="card" height="300px" className="rounded-xl" />
        </div>
      </div>
    </div>
  );
}
