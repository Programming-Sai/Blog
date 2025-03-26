import React from 'react'

// import '../app/admin/globals.css'; 
import GeneralNotFound from './general-not-found';
import AdminNotFound from './admin/admin-not-found';
import NotFoundPageToggler from './not-found-page-toggler';



export const metadata = {
  title: "404 - Not Found"
};


const NotFoundPage = () => {
  return (
    <div>
      <NotFoundPageToggler />
    </div>
  )
}

export default NotFoundPage

