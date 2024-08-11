import { TabPanel } from '@headlessui/react'

export const ViewPanel = ({content}: any) => {
  return (
    <TabPanel className="m-10 p-2">
        {content}
    </TabPanel>
  )
}
