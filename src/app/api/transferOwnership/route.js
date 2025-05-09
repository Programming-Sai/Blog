import prisma from "@/utils/connect";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";

export const GET = async () => {
  const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== "ADMIN") {
      return new NextResponse(
        JSON.stringify({ message: "Unauthorized" }),
        { status: 403 }
      );
    }


  try {

    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true, role: true, image:true },
    });

    return new NextResponse(JSON.stringify(users), { status: 200, headers: { "Content-Type": "application/json" }, });
  } catch (e) {
    console.error(e);
    return new NextResponse(
      JSON.stringify({ message: "Sorry, something went terribly wrong" }),
      { status: 500 }
    );
  }
};












export const POST = async (req) => {
  const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
      return new NextResponse(
        JSON.stringify({ message: "Unauthorized" }),
        { status: 403 }
      );
    }
  try {
  

    const { userId, newRole } = await req.json();

    if (!userId || !["ADMIN", "USER"].includes(newRole)) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid data" }),
        { status: 400 }
      );
    }

    // Prevent removing the last admin
    const adminCount = await prisma.user.count({ where: { role: "ADMIN" } });

    
    console.log("\n\n\nSession User ID:", session.user.id);
    console.log("Request User ID:", userId);
    console.log("New Role:", newRole);
    console.log("Admin Count:", adminCount, '\n\n\n');




    if (adminCount === 1 && session.user.id === userId && newRole !== "ADMIN") {
      return new NextResponse(
        JSON.stringify({ message: "Cannot remove the last admin" }),
        { status: 400 }
      );
    }


    await prisma.user.update({
      where: { id: userId },
      data: { role: newRole },
    });

    


    return new NextResponse(
      JSON.stringify({ message: "User role updated" }),
      { status: 200, headers: { "Content-Type": "application/json" }, }
    );
  } catch (e) {
    console.error(e);
    return new NextResponse(
      JSON.stringify({ message: "Sorry, something went terribly wrong" }),
      { status: 500 }
    );
  }
};
