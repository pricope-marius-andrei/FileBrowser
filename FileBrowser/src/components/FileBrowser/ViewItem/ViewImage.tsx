import { useContext } from "react"
import { FileBrowserContext } from "../../../contexts/fileBrowserContext"

const ViewImage = () => {
    const { currentItem }= useContext(FileBrowserContext)
  return (
    <img src={`${localStorage.getItem(currentItem.path)}`} className=" mx-auto my-auto max-h-[60vh] max-w-[60vw] p-10 bg-black bg-opacity-10 rounded-3xl border border-white border-opacity-15" />    
)
}

export default ViewImage