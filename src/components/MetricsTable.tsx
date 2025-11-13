import { Card, CardContent } from "@/components/ui/card";

export default function MetricsTable({ metrics }: { metrics: any }) {
  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardContent className="p-4">
          <h2 className="font-semibold mb-2 text-lg">Overall Metrics</h2>
          <p>Average Miles: {metrics.overall.avg.toFixed(2)}</p>
          <p>Min Miles: {metrics.overall.min.toFixed(2)}</p>
          <p>Max Miles: {metrics.overall.max.toFixed(2)}</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h2 className="font-semibold mb-2 text-lg">Per Person Metrics</h2>
          <table className="w-full border">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Person</th>
                <th className="text-left p-2">Average</th>
                <th className="text-left p-2">Min</th>
                <th className="text-left p-2">Max</th>
              </tr>
            </thead>
            <tbody>
              {metrics.perPerson.map((p: any) => (
                <tr key={p.person} className="border-b">
                  <td className="p-2">{p.person}</td>
                  <td className="p-2">{p.avg.toFixed(2)}</td>
                  <td className="p-2">{p.min.toFixed(2)}</td>
                  <td className="p-2">{p.max.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
