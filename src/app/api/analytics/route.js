import { BetaAnalyticsDataClient } from "@google-analytics/data";
import { NextResponse } from "next/server";

const propertyId = process.env.GOOGLE_ANALYTICS_PROPERTY_ID;
const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials: {
    client_email: process.env.GOOGLE_ANALYTICS_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_ANALYTICS_PRIVATE_KEY?.replace(
      /\\n/g,
      "\n"
    ),
  },
});

export const GET = async () => {
  try {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [
        {
          startDate: `7daysAgo`, // e.g., "7daysAgo" or "30daysAgo"
          endDate: "today",
        },
      ],
      dimensions: [
        {
          name: "year", // Data grouped by year
        },
      ],
      metrics: [
        {
          name: "activeUsers", // Returns the active users
        },
      ],
    });

    return NextResponse.json({ response }, { status: 200 });
  } catch (error) {
    console.error("Error fetching Analytics data:", error);

    return NextResponse.json(
      { error: `Failed to fetch Analytics data: ${error.message}` },
      { status: 500 }
    );
  }
};
