import { Button, Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle, TabPanel, Textarea } from "@headlessui/react"
import { useContext, useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { updateItem } from "../../../../state/fileBrowserSlice";
import { FileBrowserContext } from "../../../../contexts/fileBrowserContext";
import { SaveChangesDialog } from "../SaveChangesDialog";

export const EditorPanel = () => {
    const dispatch = useDispatch();
    const {activePath, currentItem, setCurrentItem} = useContext(FileBrowserContext);
    const currentSavedValue = currentItem?.content;
    const [editorValue, setEditorValue] = useState(currentItem?.content);

    const [dialogIsOpen, setDialogIsOpen] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    useEffect(()=> {
      setEditorValue(currentItem?.content)
    }, [activePath])

    useEffect(()=> {
      setIsSaved(editorValue === currentItem?.content);
    },[editorValue])

    const handleSaveChanges = () => {
      setDialogIsOpen(false);  dispatch(updateItem({activePath, newContent: editorValue}));
      setCurrentItem({...currentItem, content: editorValue});
      setIsSaved(true);
    }

    const handleCancelChanges = () => {
      setDialogIsOpen(false)
      setEditorValue(currentSavedValue);
    }
    
  return (
    <>
      {!isSaved && <p>The file was modified</p>}
      <TabPanel className="flex grow">
          <Textarea 
          onBlur={()=>{
              if(!isSaved)
              setDialogIsOpen(true);
            }} autoFocus={true} onChange={(textarea)=> setEditorValue(textarea.target.value)} value={editorValue} className="p-2 m-10 h-48 grow bg-slate-800"></Textarea>
      </TabPanel>
     <SaveChangesDialog 
        dialogIsOpen={dialogIsOpen} 
        setDialogIsOpen={setDialogIsOpen} 
        handleCancelChanges={handleCancelChanges} 
        handleSaveChanges={handleSaveChanges}/>
    </>
  )
}
