import { File } from "../File"
import { Folder } from "../Folder"


export const Item = ({kind}:any) => {
  return (
    kind === "folder" ? <Folder/> : <File/>
  )
}
