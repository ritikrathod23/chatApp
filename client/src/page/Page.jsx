// 

import Left from "../components/left/Left"
import Navbar from "../components/Navbar"
import Right from "../components/right/Right"

function Page() {
  return (
    <div className="">
        <Navbar/>
        <div className="flex">
        <Left/>
        <Right/>
        </div>
    </div>
  )
}

export default Page