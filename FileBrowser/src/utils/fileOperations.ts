export const readFileContent = async (filePath : string) => {
    try {
      const response = await fetch(filePath);
      
      const text = await response.text();
      return text;
    } catch (error) {
      console.error('Failed to fetch file content:', error);
    }
  };
  