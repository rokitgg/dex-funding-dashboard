import { users } from "@/lib/users";
import { DataTable } from "./data/data-table";
import { columns } from "./data/columns";
import { api } from "@/lib/api/clients/server";
import { Alert, AlertTitle, AlertDescription } from "./ui/alert";
import { CircleAlert, Terminal } from "lucide-react";




export async function FundingRates() {
  const data = await api.rates.getAggregatedFundingRates()

  return (
    <div className="container mx-auto pt-16 pb-16 px-16 flex-grow">
        <DataTable data={data.rates} columns={columns} />
        <Alert className="mt-4">
          <CircleAlert className="h-4 w-4" />
          <AlertTitle>Important Note</AlertTitle>
          <AlertDescription>
            All funding rates are annualized. The data for some coins might not be available due to API restrictions.
          </AlertDescription>
        </Alert>
    </div>
  )
}