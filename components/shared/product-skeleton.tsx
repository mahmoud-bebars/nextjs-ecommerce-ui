import { cn } from "@/lib/utils";

const ProductSkeleton = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8",
        className,
      )}
    >
      {Array.from({ length: 9 }).map((_, index) => (
        <div key={index} className="space-y-3 animate-pulse">
          <div className="aspect-square bg-gray-200 rounded-sm dark:bg-gray-700" />
          <div className="h-4 bg-gray-200 rounded w-3/4 dark:bg-gray-700" />
          <div className="h-3 bg-gray-200 rounded w-1/4 dark:bg-gray-700" />
        </div>
      ))}
    </div>
  );
};

export default ProductSkeleton;
