import React from 'react'
import BannerImage from '../assets/BANNER.png'
export default function Banner() {
  return (
    <div className='flex justify-center items-center '>
      <img src={BannerImage} alt="banner" width={900}/>
    </div>
  )
}
