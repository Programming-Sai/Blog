import { google } from "googleapis";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_ANALYTICS_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_ANALYTICS_PRIVATE_KEY?.replace(
          /\\n/g,
          "\n"
        ),
      },
      scopes: ["https://www.googleapis.com/auth/webmasters.readonly"],
    });

    const searchConsole = google.searchconsole({ version: "v1", auth });

    const siteUrl = "https://blog-da9s.vercel.app/" || process.env.NEXT_PUBLIC_BASE_URL; // Replace with your actual site URL
    const response = await searchConsole.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate: "2025-01-18", // Adjust as needed
        endDate: new Date().toISOString().split('T')[0], // Adjust as needed
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
