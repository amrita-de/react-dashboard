"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { parseCSV, computeMetrics } from "@/lib/utils";
import { RunRecord } from "@/types";
import MetricsTable from "./MetricsTable";
import ChartView from "./ChartView";

export default function FileUploader() {
  const [records, setRecords] = useState<RunRecord[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [metrics, setMetrics] = useState<any>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const data = await parseCSV(file);
      setRecords(data);
      setMetrics(computeMetrics(data));
      setError(null);
    } catch (err: any) {
      setError(err.message);
      setRecords([]);
      setMetrics(null);
    }
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <Label htmlFor="csv">Upload CSV File</Label>
        <input
          id="csv"
          type="file"
          accept=".csv"
          onChange={handleFile}
          className="border rounded p-2"
        />
      </div>

      {error && <p className="text-red-600">{error}</p>}

      {records.length > 0 && metrics && (
        <div className="w-full max-w-3xl flex flex-col gap-8">
          <MetricsTable metrics={metrics} />
          <ChartView data={records} />
        </div>
      )}
    </div>
  );
}
