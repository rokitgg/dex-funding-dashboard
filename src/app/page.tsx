import { columns } from "@/components/data/columns"
import { DataTable } from "@/components/data/data-table"
import { FundingRates } from "@/components/table"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { users } from "@/lib/users"
import { Suspense } from "react"
import { LoadingSkeleton } from "@/components/loading"



export default async function DemoPage() {
  // This is where you would fetch external data:
  // const exampleExternalData = await fetchExternalDataFunction();
  // In our example we use local data
  return (
    <div className="min-h-screen flex flex-col">
      <Suspense fallback={<LoadingSkeleton />}>
        <FundingRates />
      </Suspense>
      <footer className="py-6 flex justify-center items-center">
        <ThemeToggle />
      </footer>
    </div>
  )
}
