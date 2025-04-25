import { users } from "@/lib/users";
import { DataTable } from "./data/data-table";
import { columns } from "./data/columns";



async function getData(): Promise<User[]> {
    // Fetch data from your API here.
    await new Promise((resolve) => setTimeout(resolve, 600))
    return users
}

export async function FundingRates() {
  const data = await getData()

  return (
    <div className="container mx-auto py-32 px-16 flex-grow">
        <DataTable data={data} columns={columns} />
    </div>
  )
}