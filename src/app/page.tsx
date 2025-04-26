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
      <div className="w-full flex justify-end items-center gap-4 p-4 text-xs text-muted-foreground">
        <a href="https://github.com/your-repo" target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub</a>
        <a href="https://twitter.com/rokitdotgg" target="_blank" rel="noopener noreferrer" className="hover:underline">Twitter</a>
        <a href="https://app.hyperliquid.xyz/join/ROKIT" target="_blank" rel="noopener noreferrer" className="hover:underline">Hyperliquid</a>
      </div>
      <Suspense fallback={<LoadingSkeleton />}>
        <FundingRates />
      </Suspense>
      {/* <footer className="py-6 flex justify-center items-center">
        <ThemeToggle />
      </footer> */}
    </div>
  )
}
