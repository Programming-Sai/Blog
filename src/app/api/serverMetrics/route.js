import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
const uri = process.env.DATABASE_URL;
let client;
const connectToDatabase = async () => {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
  }
  return client.db();
};
export const GET = async () => {
  try {
    const db = await connectToDatabase();
    // Fetch overall database stats
    const stats = await db.command({ dbStats: 1 });
    // Get index sizes from all collections
    const collections = await db.listCollections().toArray();
    let totalIndexSize = 0;
    for (const collection of collections) {
      const collStats = await db.command({ collStats: collection.name });
      totalIndexSize += collStats.totalIndexSize;
    }
    // Convert bytes to MB
    const storageSizeMB = stats.storageSize / (1024 * 1024);
    const indexSizeMB = totalIndexSize / (1024 * 1024);
    const estimatedUsedMB = storageSizeMB + indexSizeMB;
    const totalStorageMB = 512;
    const remainingStorageMB = totalStorageMB - estimatedUsedMB;
    return new NextResponse(
      JSON.stringify({
        database: {
          usedMB: estimatedUsedMB.toFixed(2),
          remainingMB: remainingStorageMB.toFixed(2),
          totalMB: totalStorageMB,
        },
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (e) {
    console.log(e);
    return new NextResponse(
      JSON.stringify({ message: "Sorry, something went wrong" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
