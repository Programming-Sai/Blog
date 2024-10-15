// app/admin/layout.js
'use client'
// admin/layout.js
import '../globals.css';  // Main global styles
import './globals.css';      // Admin-specific global styles
import SideNavbar from '@/components/sidenavbar/SideNavbar';
import React from 'react';

export default function AdminLayout({ children }) {
  return (
    <div className='container'>
        <main className='wrapper'>
            <SideNavbar />
            {children}
        </main> 
    </div>
  );
}
