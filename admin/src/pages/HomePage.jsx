
import {lazy,Suspense} from 'react'
const AdminDashboard =lazy(()=>import('../components/Content'))

const HomePage = () => {
  return (
    <div>
        <Suspense fallback={<div>Loading</div>}>
          <AdminDashboard/>
        </Suspense>

      
      
    </div>
  )
}

export default HomePage
