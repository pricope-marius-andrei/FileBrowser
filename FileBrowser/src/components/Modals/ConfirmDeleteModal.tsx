
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useContext } from 'react'
import { useDispatch } from 'react-redux';
import { FileBrowserContext } from '../../contexts/fileBrowserContext';
import { deleteItem } from '../../state/fileBrowserSlice';

const ConfirmDeleteModal = ({showConfirmDeleteModal,setShowConfirmDeleteModal, path}:{ showConfirmDeleteModal: boolean, setShowConfirmDeleteModal :(value: boolean) => void, path: string }) => {
    const dispatch = useDispatch();
  const {setActivePath, currentItem} = useContext(FileBrowserContext);

    const handleDeleteFile = () => {
        
       // setShowActionsPopover(false);
        dispatch(deleteItem({path}));
        setActivePath(path.split("/").slice(0, -1).join("/"))
        console.log(currentItem);
        if(currentItem.type === 'PNG')
          { 
            console.log(currentItem.path);
            console.log(path)
            localStorage.removeItem(path);}

        setShowConfirmDeleteModal(false);
      }

    return (
    <Dialog open={showConfirmDeleteModal} as="div" className="relative z-10 focus:outline-none bg-white" onClose={()=>{setShowConfirmDeleteModal(false)}} __demoMode>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle as="h3" className="text-base/7 font-medium text-black">
              {path}
              </DialogTitle>
              <p className="mt-2 text-sm/6 text-black/50">
              Are you sure you want to delete this item?
              </p>
              <p className="mt-2 text-sm/6 text-black/50">
                this action cannot be undone. This will permanently delete the item.
              </p>
              <div className="mt-4">
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-gray-100 py-1.5 px-3 text-sm/6 font-semibold text-black shadow-inner shadow-black/10 focus:outline-none data-[hover]:bg-red-200 data-[focus]:outline-1 data-[focus]:outline-black data-[open]:bg-gray-700"
                  onClick={()=>{handleDeleteFile()}}
                >
                  Got it, thanks!
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
  )
}

export default ConfirmDeleteModal


