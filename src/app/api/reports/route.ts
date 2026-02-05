import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    data: {
      revenueMonth: 32450,
      occupancy: 0.78,
      cancellations: 4,
    },
  });
}
