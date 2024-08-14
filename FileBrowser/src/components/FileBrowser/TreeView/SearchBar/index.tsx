import { useContext, useEffect, useState } from 'react'
import { FolderItem } from '../../../../types/FileBrowserTypes';
import { FileBrowserContext } from '../../../../contexts/fileBrowserContext';


const flattenFileSystem = (data:any) => {
    let result:any = [];

    data.forEach((item:FolderItem) => {
        if (item.kind === 'folder' && item.items) {
            result.push({ ...item, isFolder: true });
            result = result.concat(flattenFileSystem(item.items));
        } else {
            result.push({ ...item, isFolder: false });
        }
    });

    return result;
};

export default function SearchBar({rawData, setFilteredData}:any) {
    const [searchQuery, setSearchQuery] = useState('');
    const rawFlattenedData = flattenFileSystem(rawData);
    const [flattenedData, setFlattenedData] = useState(flattenFileSystem(rawData));
    const {setActivePath, setCurrentItem} = useContext(FileBrowserContext);

    useEffect(() => {
        if(searchQuery !== '') {
            setFlattenedData(rawFlattenedData.filter((item:any) => 
                
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ))             

            setFilteredData(flattenedData);
        }
        else 
        {
            setFilteredData([]);
            // setActivePath('');
            setCurrentItem({});
        }
    },[searchQuery])

  return (
    <input 
        type="text" 
        placeholder="Search..." 
        value={searchQuery} 
        onChange={(e) => {setSearchQuery(e.target.value);}} 
        className="border bg-slate-900 p-2 mx-3 my-4 w-full rounded-lg text-white"
    />
  )
}
