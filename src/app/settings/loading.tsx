import { Skeleton } from '@/components/ui/Skeleton';

export default function SettingsLoading() {
  return (
    <div className="min-h-screen py-8">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <Skeleton variant="text" width="300px" height="32px" />
            <Skeleton variant="text" width="200px" height="20px" className="mt-1" />
          </div>
          <Skeleton variant="rect" width="120px" height="36px" className="rounded-full" />
        </div>

        <div className="flex gap-2 mb-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} variant="rect" width="120px" height="40px" className="rounded-lg" />
          ))}
        </div>

        <Skeleton variant="card" height="400px" className="rounded-xl" />
      </div>
    </div>
  );
}
