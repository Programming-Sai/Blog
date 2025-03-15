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
    // Today's Visits: date, userType, country
    const [todayVisits] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [
        {
          startDate: "today",
          endDate: "today",
        },
      ],
      dimensions: [{ name: "date" }],
      metrics: [{ name: "activeUsers" }],
    });

    // % Unique Visits: deviceCategory, source/medium
    const [uniqueVisits] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [
        {
          startDate: "2025-01-18",
          endDate: "today",
        },
      ],
      dimensions: [{ name: "date" }],
      metrics: [{ name: "activeUsers" }],
    });

    // Bounce Rate: pagePath, deviceCategory
    const [bounceRate] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [
        {
          startDate: "2025-01-18",
          endDate: "today",
        },
      ],
      dimensions: [{ name: "pagePath" }, { name: "deviceCategory" }],
      metrics: [{ name: "bounceRate" }],
    });

    // Traffic Sources Chart: source/medium, region
    const [trafficSourcesGeneral] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [
        {
          startDate: "2025-01-18",
          endDate: "today",
        },
      ],
      dimensions: [{ name: "sessionMedium" }],
      metrics: [{ name: "sessions" }],
    });

    // Traffic Sources Chart: source, region
    const [trafficSourcesSocials] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [
        {
          startDate: "2025-01-18",
          endDate: "today",
        },
      ],
      dimensions: [{ name: "sessionSource" }],
      metrics: [{ name: "sessions" }],
    });

    
    const result = {
      todayVisits,
      uniqueVisits,
      bounceRate,
      trafficSourcesGeneral,
      trafficSourcesSocials,
     
    };

    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    console.error("Error fetching Analytics data:", error);
    return NextResponse.json(
      { error: `Failed to fetch Analytics data: ${error.message}` },
      { status: 500 }
    );
  }
};
