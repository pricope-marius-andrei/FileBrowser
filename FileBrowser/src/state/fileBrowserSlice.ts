import data from "../data/data.json";
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { FileItem, FileSystemItem, FolderItem } from "../types/FileBrowserTypes";
import { getActiveItem } from "../utils/treeNavigation";

const localStorageFileBrowserData : string | null = localStorage.getItem("fileBrowserData") 
const fileBrowserData : FileSystemItem[] = localStorageFileBrowserData ? JSON.parse(localStorageFileBrowserData) as FileSystemItem[] : data as FileSystemItem[];

const initialState: FileSystemItem[] = fileBrowserData;

const fileBrowserSlice = createSlice({
    name: 'fileBrowser',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<{ activePath: string, newItem: FileItem | FolderItem }>) => {
            const { activePath, newItem } = action.payload;
        
            const activeItem = getActiveItem(state as FolderItem[], activePath);
            
            if (activeItem) {
                const folder = activeItem as FolderItem;

                folder.items.push(newItem);
                localStorage.setItem("fileBrowserData", JSON.stringify(state));
            }
        },
        updateItem: (state, action: PayloadAction<{ activePath: string, newContent: string }>) => {
            const {activePath, newContent} = action.payload;
            const activeItem = getActiveItem(state as FolderItem[],activePath);

            if(activeItem) 
            {
                const folder = activeItem as FileItem;

                folder.content = newContent;
                localStorage.setItem("fileBrowserData", JSON.stringify(state));
            }
        },
        deleteItem: (state, action: PayloadAction<{ path: string }>) => {
            const {path} = action.payload;
            console.log(path, typeof path);
            const activeItem = getActiveItem(state as FolderItem[],path);
            
            if(activeItem) 
            {
                const parentPath = path.split('/').slice(0,-1).join('/');
                console.log(parentPath);
                const parentItem = getActiveItem(state as FolderItem[],parentPath) as FolderItem;

                parentItem.items = parentItem.items.filter(item => item.path !== path);
                localStorage.setItem("fileBrowserData", JSON.stringify(state));
            }
        }
    },
});


export const { addItem, updateItem, deleteItem } = fileBrowserSlice.actions;

export default fileBrowserSlice.reducer;