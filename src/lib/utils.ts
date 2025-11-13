import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// ✅ Utility: combine Tailwind CSS class names safely
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ✅ CSV Parsing + Metric Calculation Helpers
import Papa from "papaparse";

export type RunRecord = {
  date: string;
  person: string;
  miles: number;
};

// Parse and validate CSV file
// Parse and validate CSV file
export function parseCSV(file: File): Promise<RunRecord[]> {
  return new Promise((resolve, reject) => {
    Papa.parse<RunRecord>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (!results.data || results.data.length === 0) {
          reject(new Error("CSV is empty or invalid"));
          return;
        }

        const data: RunRecord[] = [];

        for (const row of results.data) {
          const date = (row as any).date?.trim?.();
          const person = (row as any).person?.trim?.();
          const miles = Number((row as any).miles);

          if (!date || !person || isNaN(miles)) {
            reject(new Error("Invalid CSV: Missing or incorrect values"));
            return;
          }

          data.push({ date, person, miles });
        }

        resolve(data);
      },
      error: (err: Error) => {
        reject(new Error(`Failed to parse CSV: ${err.message}`));
      },
    });
  });
}


// Compute overall + per-person metrics
export function computeMetrics(data: RunRecord[]) {
  const overallMiles = data.map((r) => r.miles);
  const avg = overallMiles.reduce((a, b) => a + b, 0) / overallMiles.length || 0;
  const min = Math.min(...overallMiles);
  const max = Math.max(...overallMiles);

  const perPerson: Record<string, RunRecord[]> = {};
  data.forEach((r) => {
    if (!perPerson[r.person]) perPerson[r.person] = [];
    perPerson[r.person].push(r);
  });

  const perPersonMetrics = Object.entries(perPerson).map(([person, runs]) => {
    const miles = runs.map((r) => r.miles);
    return {
      person,
      avg: miles.reduce((a, b) => a + b, 0) / miles.length,
      min: Math.min(...miles),
      max: Math.max(...miles),
    };
  });

  return { overall: { avg, min, max }, perPerson: perPersonMetrics };
}
