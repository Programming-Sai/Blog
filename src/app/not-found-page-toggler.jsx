'use client'
import React from 'react'
import { usePathname } from 'next/navigation';
import AdminNotFound from './admin/admin-not-found';
import GeneralNotFound from './general-not-found';

const NotFoundPageToggler = () => {
    const pathname = usePathname();

    const isAdmin = pathname.startsWith('/admin');

  return (
    isAdmin ? <AdminNotFound /> : <GeneralNotFound />
  )
}

export default NotFoundPageToggler
