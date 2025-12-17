import { Progress } from '@/components/ui/progress';

interface ProgressIndicatorProps {
  completed: number;
  total: number;
}

export default function ProgressIndicator({ completed, total }: ProgressIndicatorProps) {
  const percentage = (completed / total) * 100;

  return (
    <div className="flex items-center gap-3">
      <div className="hidden md:block w-32">
        <Progress value={percentage} className="h-2" />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold text-neutral-900">{completed}</span>
        <span className="text-xs text-neutral-500 font-medium">/ {total}</span>
      </div>
    </div>
  );
}