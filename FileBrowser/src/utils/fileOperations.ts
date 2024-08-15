import { FileSystemItem } from "../types/FileBrowserTypes";

export const readFileContent = async (filePath : string) => {
    try {
      const response = await fetch(filePath);
      
      const text = await response.text();
      return text;
    } catch (error) {
      console.error('Failed to fetch file content:', error);
    }
  };
export const flattenFileSystem = (data: FileSystemItem[]) => {
    let result: FileSystemItem[] = [];

    data.forEach((item: FileSystemItem) => {
        if (item.kind === 'folder' && item.items) {
            result.push({ ...item });
            result = result.concat(flattenFileSystem(item.items));
        } else {
            result.push({ ...item });
        }
    });

    return result;
};
  