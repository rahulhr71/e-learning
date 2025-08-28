
import {lazy,Suspense} from 'react'
const Sidebar =lazy(()=>import('../components/Sidebar'))

const HomePage = () => {
  return (
    <div>
        <Suspense fallback={<div>Loading</div>}>
          <Sidebar/>
        </Suspense>

      
      
    </div>
  )
}

export default HomePage
