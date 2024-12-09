const useTraverseTree =()=>{
    function insertNode (originalArray,folderId,item,isFolder){
         if (originalArray.id === folderId && originalArray.isFolder) {
            originalArray.items.unshift({
                id:new Date().getTime(),
                name:item,
                isFolder,
                items:[]
            })
            return originalArray
         }
         let latestNode =[]
       latestNode = originalArray.items.map((obj)=>{
            return insertNode(obj,folderId,item,isFolder)
         })
         return {...originalArray,items:latestNode}
    }
    return {insertNode }
}
export default useTraverseTree;