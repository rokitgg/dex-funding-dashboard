import { users } from "@/lib/users";
import { DataTable } from "./data/data-table";
import { columns } from "./data/columns";
import { api } from "@/lib/api/clients/server";
import { Alert, AlertTitle, AlertDescription } from "./ui/alert";
import { CircleAlert, Terminal } from "lucide-react";
import { unstable_noStore as noStore } from 'next/cache';




export async function FundingRates() {
  noStore(); // This component should run dynamically
  const data = await api.rates.getAggregatedFundingRates()

  return (
    <div className="container mx-auto py-12 px-16 flex-grow">
        <DataTable data={data.rates} columns={columns} />
        <Alert className="mt-4">
          <CircleAlert className="h-4 w-4" />
          <AlertTitle>Important Note</AlertTitle>
          <AlertDescription>
            All funding rates are annualized. The data for some coins might not be available due to API limitations.
          </AlertDescription>
        </Alert>
    </div>
  )
}