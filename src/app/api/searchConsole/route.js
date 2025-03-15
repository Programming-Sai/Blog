import { google } from "googleapis";
import { NextResponse } from "next/server";
import credentials from "@/utils/service.config.json"; // Path to your service account JSON

export const GET = async () => {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/webmasters.readonly"],
    });

    const searchConsole = google.searchconsole({ version: "v1", auth });

    const siteUrl = process.env.NEXT_PUBLIC_BASE_URL; // Replace with your actual site URL
    const response = await searchConsole.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate: "2025-01-18", // Adjust as needed
        endDate: "today", // Adjust as needed
        dimensions: ["query", "page"],
        rowLimit: 10,
      },
    });

    return new NextResponse(JSON.stringify(response.data, null, 2), {
      status: 200,
    });
  } catch (e) {
    console.error(e);
    return new NextResponse(
      JSON.stringify({ message: "Sorry, something went wrong" }),
      { status: 500 }
    );
  }
};
