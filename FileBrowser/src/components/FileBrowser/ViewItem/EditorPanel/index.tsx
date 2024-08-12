import { TabPanel, Textarea } from "@headlessui/react"
import { useContext, useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { updateItem } from "../../../../state/fileBrowserSlice";
import { FileBrowserContext } from "../../../../contexts/fileBrowserContext";

export const EditorPanel = () => {
    const dispatch = useDispatch();
    const {activePath, currentItem, setCurrentItem} = useContext(FileBrowserContext);
    const [editorValue, setEditorValue] = useState(currentItem?.content);

    useEffect(()=> {
      setEditorValue(currentItem?.content)
    }, [activePath])
    
  return (
    <TabPanel className="flex grow">
        <Textarea onBlur={()=>{
          dispatch(updateItem({activePath, newContent: editorValue}));
          setCurrentItem({...currentItem, content: editorValue});
          
          }} autoFocus={true} onChange={(textarea)=> setEditorValue(textarea.target.value)} value={editorValue} className="p-2 m-10 h-48 grow bg-slate-800"></Textarea>
    </TabPanel>
  )
}
