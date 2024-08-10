import React, { useContext, useEffect } from 'react'
import { FileBrowserContext } from '../../contexts/fileBrowserContext'

export const ViewItem = () => {

    const {activePath} = useContext(FileBrowserContext);

  return (
    <div className='p-10'>
        <h1>
            {activePath}
        </h1>
    </div>
  )
}
