"use client";

import { TrendingUp } from "lucide-react";
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
const chartData = [
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  safari: {
    label: "Safari",
    color: "#3868F6",
  },
} satisfies ChartConfig;

export default function RadialChartCard({parameter,val}:{parameter:any,val:any}) {
  return (
    <div className="h-[25vh] w-[50vh]">
      <Card className="flex flex-row h-full">
        <CardHeader className="flex-shrink-0 pb-0">
          <CardTitle className="font-semibold">
            <p className="font-semibold">{parameter}</p>
          </CardTitle>
          <CardDescription className="scroll-m-20 pb-2 text-3xl font-bold tracking-tight first:mt-0">
            {val}%
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow pb-0">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <RadialBarChart
              data={chartData}
              startAngle={90}
              endAngle={90-(360*(val/100))}
              innerRadius={80}
              outerRadius={110}
            >
              <PolarGrid
                gridType="circle"
                radialLines={false}
                stroke="none"
                className="first:fill-muted last:fill-background"
                polarRadius={[86, 74]}
              />
              <RadialBar dataKey="visitors" background cornerRadius={10} />
              <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              </PolarRadiusAxis>
            </RadialBarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
