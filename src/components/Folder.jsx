import React, { useState } from "react";
import { FaFolder } from "react-icons/fa";
import { CiFileOn } from "react-icons/ci";

const Folder = ({ explorer,handleTraverseTree }) => {
  const [isFolder, setISFolder] = useState(true);
  const [expand, setExpand] = useState(false);
  const [showInput,setShowInput]=useState({
    visible:false,
    isFolder:null
  })
  

  const handleFileAndFolder =(e,isFolder)=>{
    e.stopPropagation();
    setShowInput({
      visible:true,
      isFolder:isFolder
    })
  }

  const onAddFolder =(e)=>{
     if (e.keyCode === 13 && e.target.value) {
       handleTraverseTree(explorer.id,e.target.value,showInput.isFolder);
       setShowInput({...showInput,visible:false})
     }
  }

  if (explorer?.isFolder) {
    return (
      <div className="my-2">
        <div className="">
          <div className="relative">
            <span
              className=" flex gap-2 items-center text-2xl cursor-pointer bg-gray-200 w-64"
              onClick={() => setExpand(!expand)}
            >
              <FaFolder className="text-yellow-300" /> {explorer.name}
            </span>
            <div className="absolute top-0 left-[8em] flex gap-2">
              <button className="px-1 bg-gray-600 rounded text-white"
              onClick={(e)=>handleFileAndFolder(e,true)}>
                Folder +
              </button>
              <button className="px-2 py-1 bg-gray-600 rounded text-white" 
              onClick={(e)=>handleFileAndFolder(e,false)}>
                File +
              </button>
            </div>
          </div>
         {showInput.visible &&(
          <div className="flex ml-4 pt-2">
              <span>{showInput.isFolder?<FaFolder className="text-yellow-300 text-2xl" />
              :<CiFileOn className="text-gray-400 text-2xl" /> }</span>
              <input
              type="text"
              autoFocus
              onKeyDown={onAddFolder}
              onBlur={()=>setShowInput({...showInput,visible:false})}
              className="w-40"
              >
              </input>
          </div>
         )}
          <div style={{ display: expand ? "block" : "none" }} className="ml-4">
            {explorer?.items?.map((exp, index) => (
              <React.Fragment key={index}>
                {exp.isFolder ? (
                  <Folder explorer={exp} handleTraverseTree={handleTraverseTree}/>
                ) : (
                  <span
                    className="flex gap-2 items-center text-2xl"
                    key={index}
                  >
                    <CiFileOn className="" /> {exp?.name}
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <span className="flex gap-2 items-center text-2xl" key={index}>
        <CiFileOn /> {explorer?.name}
      </span>
    );
  }
};

export default Folder;
