"use client";

import { ColumnDef } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { DataTableColumnHeader } from "./data-table-column-header";

function formatRate(rate: string | null) {
  if (rate === null) return "-";
  const num = Number(rate);
  const color = num > 0 ? "text-green-600" : num < 0 ? "text-red-600" : "";
  return <span className={cn(color, "font-mono")}>{Number(rate).toFixed(6)}%</span>;
}

export const columns: ColumnDef<FundingRate>[] = [
  {
    accessorKey: "coin",
    header: "Coin",
    cell: ({ row }) => <span className="font-semibold">{row.original.coin}</span>,
  },
  {
    accessorKey: "binance",
    header: ({ column }) => <DataTableColumnHeader column={column} title={"Binance"} />,
    cell: ({ row }) => formatRate(row.original.binance),
  },
  {
    accessorKey: "bybit",
    header: ({ column }) => <DataTableColumnHeader column={column} title={"Bybit"} />,
    cell: ({ row }) => formatRate(row.original.bybit),
  },
  {
    accessorKey: "hyperliquid",
    header: ({ column }) => <DataTableColumnHeader column={column} title={"Hyperliquid"} />,
    cell: ({ row }) => formatRate(row.original.hyperliquid),
  },
  {
    accessorKey: "lighter",
    header: ({ column }) => <DataTableColumnHeader column={column} title={"Lighter"} />,
    cell: ({ row }) => formatRate(row.original.lighter),
  },
];