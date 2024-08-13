import { Button, Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react"

interface SaveChangesDialogProps {
    dialogIsOpen: boolean,
    setDialogIsOpen(param1: boolean): void,
    handleCancelChanges(): void,
    handleSaveChanges(): void,

}

export const SaveChangesDialog = ({dialogIsOpen, setDialogIsOpen, handleCancelChanges, handleSaveChanges}:SaveChangesDialogProps) => {
  return (
    <Dialog open={dialogIsOpen} onClose={() => setDialogIsOpen(false)} className=" relative z-50 flex ">
    <DialogBackdrop className="fixed inset-0 bg-black/30" />

    <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
      
      <DialogPanel className="max-w-lg space-y-4 bg-slate-600 text-white p-20 rounded-xl">
        <DialogTitle className="text-3xl font-bold text-center">The file was modified</DialogTitle>
        <Description className="text-center">Do you want to save changes?</Description>
        <div className="flex gap-4 justify-center">
          <Button className="bg-slate-800 rounded-xl px-10 py-2 text-white"  onClick={handleSaveChanges}>Save Changes</Button>
          <Button className="bg-red-950 rounded-xl px-10 py-2 text-white" onClick={handleCancelChanges}>Cancel</Button>
        </div>
      </DialogPanel>
    </div>
  </Dialog>
  )
}
