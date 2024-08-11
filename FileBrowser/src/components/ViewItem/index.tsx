import { useContext } from 'react'
import { FileBrowserContext } from '../../contexts/fileBrowserContext'
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';

export const ViewItem = () => {
    const state = useSelector((state:RootState) => state.fileBrowser);
    const {activePath} = useContext(FileBrowserContext);

  return (
    <div className='p-10'>
        <h1>
            {activePath}
        </h1>
        <div>{JSON.stringify(state)}</div>
    </div>
  )
}
