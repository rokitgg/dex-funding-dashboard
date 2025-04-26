"use client";

import { ColumnDef } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { DataTableColumnHeader } from "./data-table-column-header";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

function formatRate(rate: string | null) {
  if (rate === null) return "-";
  const num = Number(rate);
  const color = num > 0 ? "text-emerald-600" : num < 0 ? "text-rose-600" : "";
  return <span className={cn(color, "font-mono")}>{Number(rate).toFixed(3)}%</span>;
}

function getBestLongShort(row: FundingRate) {
  // Collect rates and their exchange names, filtering out null, "-", and NaN
  const sources = [
    { name: "Binance", value: row.binance },
    { name: "Bybit", value: row.bybit },
    { name: "Hyperliquid", value: row.hyperliquid },
    { name: "Lighter", value: row.lighter },
  ];

  // Only include rates that are not null, not "-", and are valid numbers
  const rates = sources
    .filter(r => r.value !== null && r.value !== undefined && r.value !== "-")
    .map(r => ({ name: r.name, value: Number(r.value) }))
    .filter(r => !isNaN(r.value));

  if (rates.length < 2) return null;

  // Long the most negative (lowest), short the most positive (highest)
  const bestLong = rates.reduce((a, b) => (a.value < b.value ? a : b));
  const bestShort = rates.reduce((a, b) => (a.value > b.value ? a : b));
  const spread = (bestShort.value - bestLong.value).toFixed(3);

  return {
    long: bestLong.name,
    short: bestShort.name,
    spread,
  };
}

function RateCell({ value, row }: { value: string | null, row: any }) {
  const info = getBestLongShort(row.original);
  const rate = formatRate(value);

  if (!info) return rate;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="cursor-default">{rate}</span>
      </TooltipTrigger>
      <TooltipContent>
        Long on {info.long}, Short on {info.short} – <span className="font-bold">{info.spread}% APR</span>
      </TooltipContent>
    </Tooltip>
  );
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
    cell: ({ row }) => <RateCell value={row.original.binance} row={row} />,
  },
  {
    accessorKey: "bybit",
    header: ({ column }) => <DataTableColumnHeader column={column} title={"Bybit"} />,
    cell: ({ row }) => <RateCell value={row.original.bybit} row={row} />,
  },
  {
    accessorKey: "hyperliquid",
    header: ({ column }) => <DataTableColumnHeader column={column} title={"Hyperliquid"} />,
    cell: ({ row }) => <RateCell value={row.original.hyperliquid} row={row} />,
  },
  {
    accessorKey: "lighter",
    header: ({ column }) => <DataTableColumnHeader column={column} title={"Lighter"} />,
    cell: ({ row }) => <RateCell value={row.original.lighter} row={row} />,
  },
];