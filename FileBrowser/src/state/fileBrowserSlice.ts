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
            const activeItem = getActiveItem(state, activePath);
            
            if (activeItem) {
                const folder = activeItem as FolderItem;

                folder.items.push(newItem);
                localStorage.setItem("fileBrowserData", JSON.stringify(state));
            }
        },
    },
});


export const { addItem } = fileBrowserSlice.actions;

export default fileBrowserSlice.reducer;