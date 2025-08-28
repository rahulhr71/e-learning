import { Home } from "@mui/icons-material"

import { lazy,Suspense } from "react"
const HomePage=lazy(()=>import('./pages/HomePage'))
function App() {
  
  return (
    <>
   <Suspense fallback={<div>loading</div>}>
   <HomePage/>
   </Suspense>
    </>
  )
}

export default App
