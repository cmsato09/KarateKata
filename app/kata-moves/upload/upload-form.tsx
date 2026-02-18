"use client";

import { useState } from "react";
import type { Kata, Stance, Technique } from "@/app/generated/prisma/browser";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface KataMovesProps {
  katas: Kata[];
  stances: Stance[];
  techniques: Technique[];
}
export function KataMovesUploadForm({
  katas,
  stances,
  techniques,
}: KataMovesProps) {
  const [selectedKataId, setSelectedKataId] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      {/* Kata selector */}
      <div className="flex flex-col gap-2 max-w-sm">
        <Label>Select a Kata</Label>
        <Select onValueChange={(value) => setSelectedKataId(Number(value))}>
          <SelectTrigger>
            <SelectValue placeholder="Choose a kata..." />
          </SelectTrigger>
          <SelectContent>
            {katas.map((kata) => (
              <SelectItem key={kata.id} value={String(kata.id)}>
                {kata.name} ({kata.style})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="manual">
        <TabsList>
          <TabsTrigger value="manual" disabled={!selectedKataId}>
            Manual Entry
          </TabsTrigger>
          <TabsTrigger value="csv" disabled={!selectedKataId}>
            CSV Upload
          </TabsTrigger>
        </TabsList>
        <TabsContent value="manual">
          <p>PLACEHOLDER</p>
        </TabsContent>
        <TabsContent value="csv">
          <p>PLACEHOLDER</p>
        </TabsContent>
      </Tabs>

      {/* Move queue */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Move Queue</h3>
          <Button variant="ghost" size="sm">
            Clear Queue
          </Button>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Move #</TableHead>
                <TableHead>Seq</TableHead>
                <TableHead>Timing</TableHead>
                <TableHead>Stance</TableHead>
                <TableHead>Technique</TableHead>
                <TableHead>Direction</TableHead>
                <TableHead>Lead Foot</TableHead>
                <TableHead>Hip</TableHead>
                <TableHead>Active Side</TableHead>
                <TableHead>Speed</TableHead>
                <TableHead>Snap/Thrust</TableHead>
                <TableHead>Level</TableHead>
                <TableHead>Breath</TableHead>
                <TableHead>Kiai</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell colSpan={15}>
                  PLACEHOLDER
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <Button disabled>Import Moves</Button>
      </div>
    </div>
  );
}
