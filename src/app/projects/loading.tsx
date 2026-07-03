import { Skeleton } from '@/components/ui/Skeleton';

export default function ProjectsLoading() {
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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} variant="card" height="100px" className="rounded-xl" />
          ))}
        </div>

        <div className="flex gap-4 mb-6">
          <Skeleton variant="rect" width="100%" height="44px" className="rounded-lg" />
          <Skeleton variant="rect" width="160px" height="44px" className="rounded-lg" />
          <Skeleton variant="rect" width="160px" height="44px" className="rounded-lg" />
        </div>

        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} variant="card" height="180px" className="rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
