import React from 'react'
import { useAdmin } from '../context/adminContext'
const Content = () => {
 const  {activeComponent, setActiveComponent}=useAdmin();
 const RenderComponent=()=>{
    switch (activeComponent) {
        case "home":
            return(<div className='bg-amber-600'>homepage</div>)
        case "courses":
           return     <div>Course</div>;
        case "notes":
           return     <div>Notes</div>;
        case "all user":
           return     <div>all users</div>;
        case "settings":
            return <div>setting</div>;
        default:
            break;
    }
 }
  return (
    <div>
      <RenderComponent/>
    </div>
  )
}

export default Content
