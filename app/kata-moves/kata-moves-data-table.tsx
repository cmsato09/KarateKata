"use client"

import * as React from "react"
import { ChevronDownIcon } from "lucide-react"
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  Table as TanStackTable,
  useReactTable,
} from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import type { MoveWithRelations } from "./columns";

interface KataMovesDataTableProps {
  columns: ColumnDef<MoveWithRelations, unknown>[]
  data: MoveWithRelations[]
}

type FilterOption = { value: string; label: string }

const techniqueTypeOptions: FilterOption[] = [
  { value: "BLOCK", label: "Block" },
  { value: "PUNCH", label: "Punch" },
  { value: "KICK", label: "Kick" },
  { value: "STRIKE", label: "Strike" },
  { value: "PREP", label: "Prep" },
]
const timingOptions: FilterOption[] = [
  { value: "SIMULTANEOUS", label: "Simultaneous" },
  { value: "SEQUENTIAL", label: "Sequential" },
]
const directionOptions: FilterOption[] = [
  { value: "N", label: "North" },
  { value: "S", label: "South" },
  { value: "E", label: "East" },
  { value: "W", label: "West" },
  { value: "NE", label: "Northeast" },
  { value: "NW", label: "Northwest" },
  { value: "SE", label: "Southeast" },
  { value: "SW", label: "Southwest" },
]
const techniqueLevelOptions: FilterOption[] = [
  { value: "GEDAN", label: "Gedan (Lower)" },
  { value: "CHUDAN", label: "Chudan (Middle)" },
  { value: "JODAN", label: "Jodan (Upper)" },
  { value: "GEDAN_JODAN", label: "Gedan & Jodan" },
]
const leadFootOptions: FilterOption[] = [
  { value: "LEFT", label: "Left" },
  { value: "RIGHT", label: "Right" },
]
const hipOptions: FilterOption[] = [
  { value: "HANMI", label: "Hanmi" },
  { value: "SHOMEN", label: "Shomen" },
  { value: "GYAKUHANMI", label: "Gyaku Hanmi" },
]
const activeSideOptions: FilterOption[] = [
  { value: "LEFT", label: "Left" },
  { value: "RIGHT", label: "Right" },
  { value: "BOTH", label: "Both" },
  { value: "NEITHER", label: "Neither" },
]
const speedOptions: FilterOption[] = [
  { value: "FAST", label: "Fast" },
  { value: "SLOW", label: "Slow" },
  { value: "FAST_SLOW", label: "Fast → Slow" },
  { value: "SLOW_FAST", label: "Slow → Fast" },
]
const snapThrustOptions: FilterOption[] = [
  { value: "SNAP", label: "Snap" },
  { value: "THRUST", label: "Thrust" },
]

function ColumnFilter({
  table,
  columnId,
  label,
  options,
}: {
  table: TanStackTable<MoveWithRelations>
  columnId: string
  label: string
  options?: FilterOption[]
}) {
  const column = table.getColumn(columnId)

  const selectOptions: FilterOption[] = options ?? Array.from(
    column?.getFacetedUniqueValues()?.keys() ?? []
  )
    .filter((v) => v != null && v !== "")
    .sort()
    .map((v) => ({ value: String(v), label: String(v) }))

  const filterValue = column?.getFilterValue() as string | undefined

  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs text-muted-foreground">{label}</label>
      <Select
        value={filterValue ?? "all"}
        onValueChange={(value) =>
          column?.setFilterValue(value === "all" ? undefined : value)
        }
      >
        <SelectTrigger className="min-w-[140px]">
          <SelectValue placeholder={`All ${label}`} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          {selectOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

function KiaiFilter({
  table,
}: {
  table: TanStackTable<MoveWithRelations>
}) {
  const column = table.getColumn("kiai")
  const filterValue = column?.getFilterValue()

  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs text-muted-foreground">Kiai</label>
      <Select
        value={filterValue === undefined ? "all" : filterValue ? "yes" : "no"}
        onValueChange={(value) => {
          if (value === "all") column?.setFilterValue(undefined)
          else column?.setFilterValue(value === "yes")
        }}
      >
        <SelectTrigger className="min-w-[140px]">
          <SelectValue placeholder="All" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="yes">Yes</SelectItem>
          <SelectItem value="no">No</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

export function KataMovesDataTable({
  columns,
  data,
}: KataMovesDataTableProps) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [moreFiltersOpen, setMoreFiltersOpen] = React.useState(false)

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    state: {
      columnFilters,
    },
  })

  return (
    <div>
      <div className="space-y-4 py-4">
        {/* Major filters */}
        <div className="flex flex-wrap gap-4 items-end">
          <ColumnFilter table={table} columnId="kata_name" label="Kata" />
          <ColumnFilter table={table} columnId="stance_name" label="Stance" />
          <ColumnFilter table={table} columnId="technique_type" label="Tech Type" options={techniqueTypeOptions}/>
          <ColumnFilter table={table} columnId="technique_name" label="Technique" />
          {columnFilters.length > 0 && (
            <Button variant="ghost" onClick={() => setColumnFilters([])} className="self-end">
              Reset filters
            </Button>
          )}
        </div>

        {/* Minor filters */}
        <Collapsible open={moreFiltersOpen} onOpenChange={setMoreFiltersOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              More filters
              <ChevronDownIcon className={`size-4 transition-transform ${moreFiltersOpen ? "rotate-180" : ""}`} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4">
            <div className="flex flex-wrap gap-4">
              <ColumnFilter table={table} columnId="timing" label="Timing" options={timingOptions}/>
              <ColumnFilter table={table} columnId="direction" label="Direction" options={directionOptions}/>
              <ColumnFilter table={table} columnId="level" label="Level" options={techniqueLevelOptions}/>
              <ColumnFilter table={table} columnId="lead_foot" label="Lead Foot" options={leadFootOptions}/>
              <ColumnFilter table={table} columnId="hip" label="Hip Position" options={hipOptions}/>
              <ColumnFilter table={table} columnId="active_side" label="Active Side" options={activeSideOptions}/>
              <ColumnFilter table={table} columnId="speed" label="Speed" options={speedOptions}/>
              <ColumnFilter table={table} columnId="snap_thrust" label="Snap/Thrust" options={snapThrustOptions}/>
              <ColumnFilter table={table} columnId="breath" label="Breath"/> {/* TODO ADD BREADTH TO DB */}
              <KiaiFilter table={table} />
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
