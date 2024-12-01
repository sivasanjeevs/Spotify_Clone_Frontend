import React from 'react'
import Navbar from './Navbar'
import { albumsData } from '../assets/assets'
import Albumitems from './Albumitems'
import { songsData } from '../assets/assets'
import Songitems from './Songitems'

const Displayhome = () => {
  return (
    <>
        <Navbar />
        <div className='mb-4'>
            <h1 className='my-5 font-bold text-2xl'>Features Chart</h1>
            <div className='flex overflow-auto'>
                {albumsData.map((items, index) => (<Albumitems  key={index} name={items.name} desc={items.desc} id={items.id} image={items.image}/>))}
            </div>
        </div>
        <div className='mb-4'>
            <h1 className='my-5 font-bold text-2xl'>Today's Biggest hits</h1>
            <div className='flex overflow-auto'>
                {songsData.map((item, index) => (<Songitems key={index} name={item.name} desc={item.desc} id={item.id} image={item.image} />))}
            </div>
        </div>
    </>
  )
}

export default Displayhome