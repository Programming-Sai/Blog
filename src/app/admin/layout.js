// app/admin/layout.js
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/utils/auth"; // import your authOptions (configured in [...nextauth].js)
import TopBar from "@/components/topbar/TopBar";
import SideNavbar from "@/components/sidenavbar/SideNavbar";
import React from "react";
import "./globals.css";

export default async function AdminLayout({ children }) {
  const session = await getServerSession(authOptions);

  // Server-side check for user session
  if (session?.user?.role !== "ADMIN") {
    return redirect(`/not-authorized`);
  }

  return (
    <div className="admin-container">
      <main className="admin-wrapper">
        <SideNavbar />
        <TopBar />
        {children}
      </main>
    </div>
  );
}
