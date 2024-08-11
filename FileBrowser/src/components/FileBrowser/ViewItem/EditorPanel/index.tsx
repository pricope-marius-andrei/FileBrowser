import { TabPanel, Textarea } from "@headlessui/react"

export const EditorPanel = ({content}:any) => {
  return (
    <TabPanel className="flex grow">
        <Textarea autoFocus={true} value={content} className="p-2 m-10 h-48 grow bg-slate-800" name="description"></Textarea>
    </TabPanel>
  )
}
