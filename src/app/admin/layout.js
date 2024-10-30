// app/admin/layout.js
'use client'
import TopBar from '@/components/topbar/TopBar';
// import '../globals.css'; 
import './globals.css';  
import SideNavbar from '@/components/sidenavbar/SideNavbar';
import React from 'react';


export default function AdminLayout({ children }) {
  return (
    <div className='admin-container'>
        <main className='admin-wrapper'>
            <SideNavbar />
            <TopBar />
            {children}
        </main> 
    </div>
  );
}
