import { users } from "@/lib/users";
import { DataTable } from "./data/data-table";
import { columns } from "./data/columns";
import { Skeleton } from "./ui/skeleton";


const ROWS = 1
const COLUMNS = 6

export function LoadingSkeleton() {
  return (
    <div className="container mx-auto py-32 px-16 flex-grow">
        <div className="space-y-4">
        {/* Toolbar skeleton */}
        <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center space-x-2">
            <Skeleton className="h-9 w-[250px]" /> {/* Search input */}
            <Skeleton className="h-9 w-[100px]" /> {/* Status filter button */}
            </div>
            <Skeleton className="h-9 w-[120px]" /> {/* View columns button */}
        </div>

        {/* Table skeleton */}
        <div className="rounded-md border">
            <div className="relative w-full overflow-auto">
            {/* Header */}
            <div className="bg-muted/50 p-4">
                <div className="flex items-center justify-between gap-4">
                {[...Array(COLUMNS)].map((_, i) => (
                    <Skeleton key={i} className="h-5 w-[100px]" />
                ))}
                </div>
            </div>

            {/* Body */}
            <div className="p-4">
                {[...Array(ROWS)].map((_, rowIndex) => (
                <div
                    key={rowIndex}
                    className="flex items-center justify-between gap-4 py-3"
                >
                    {[...Array(COLUMNS)].map((_, cellIndex) => (
                    <Skeleton
                        key={cellIndex}
                        className="h-4 w-[100px]"
                    />
                    ))}
                </div>
                ))}
            </div>
            </div>
        </div>

        {/* Pagination skeleton */}
        <div className="flex items-center justify-between px-2">
            <Skeleton className="h-8 w-[100px]" /> {/* Rows selected */}
            <div className="flex items-center space-x-6">
            <Skeleton className="h-8 w-[100px]" /> {/* Rows per page */}
            <Skeleton className="h-8 w-[100px]" /> {/* Page numbers */}
            <div className="flex items-center space-x-2">
                {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-8 w-8" /> /* Pagination buttons */
                ))}
            </div>
            </div>
        </div>
        </div>
    </div>
  )
}