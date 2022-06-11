import RNFetchBlob from "rn-fetch-blob";

export const generateFileSystemPath = (paths: string[]): Promise<string[]> => {
  return new Promise<string[]>(resolve => {
    const fileSystemPath = [];

    for (let i = 0; i < paths.length; i++) {
      fileSystemPath.push(`${RNFetchBlob.fs.dirs.SDCardApplicationDir}/downloads/${paths[i]}`);
      console.log("ASDFGHJKLKJHGFGHKL;");
       
    }
    resolve(fileSystemPath);
  });
};
