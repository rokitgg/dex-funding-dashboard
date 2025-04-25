import { columns } from "@/components/data/columns"
import { DataTable } from "@/components/data/data-table"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { users } from "@/lib/users"



export default async function DemoPage() {
  // This is where you would fetch external data:
  // const exampleExternalData = await fetchExternalDataFunction();

  // In our example we use local data
  return (
    <div className="min-h-screen flex flex-col">
      <div className="container mx-auto py-32 px-16 flex-grow">
        <DataTable data={users} columns={columns} />
      </div>
      <footer className="py-6 flex justify-center items-center">
        <ThemeToggle />
      </footer>
    </div>
  )
}
