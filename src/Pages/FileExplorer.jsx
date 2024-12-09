import React, { useState } from 'react';
import explorer from '../Data/folderData';
import Folder from '../components/Folder';
import useTraverseTree from '../components/Hooks/useTraverseTree';
const FileExplorer = () => {
    const [explorerData,setExplorerData]=useState(explorer)
    const {insertNode} = useTraverseTree()
    // console.log(explorerData);
    const handleTraverseTree =(folderId,item,isFolder)=>{
        const finalTree = insertNode(explorerData,folderId,item,isFolder)
        setExplorerData(finalTree)
    }
  return (
    <div>
        <Folder explorer={explorerData} handleTraverseTree={handleTraverseTree}/>
    </div>
  )
}

export default FileExplorer;