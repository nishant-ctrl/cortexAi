import { Code2, PanelRightClose } from 'lucide-react';
import React from 'react'
import { useSelector } from 'react-redux';
import {easeInOut, motion} from "motion/react"
import { useState } from 'react';
const Artifact = () => {
  const [collapse, setCollapse] = useState(false)
  const {artifacts}=useSelector(state=>state.message)
  if(artifacts.length==0) return;
  return (
      <motion.div 
      initial={{width:250}}
      animate={{width:collapse?48:250}}
      transition={{
        duration:0.25,
        ease:easeInOut
      }}
      className="hidden lg:flex h-full border-l border-white/[0.06] flex-col overflow-hidden shrink-0 w-[250px]">
        {!collapse ? 
          <div className="flex flex-col h-full bg-[#0d0f14]">
              <div className="h-14 px-4 border-b border-white/[0.06] flex items-center gap-3 shrink-0">
                  <button
                      className="flex items-center justify-center w-7 h-7 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-white/[0.05] transition-colors duration-150 bg-transparent border-none cursor-pointer shrink-0"
                      onClick={() => setCollapse(true)}
                  >
                      <PanelRightClose size={16} />
                  </button>
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                      <div className="flex items-center justify-center w-6 h-6 rounded-md bg-indigo-500/10 border border-indigo-500/20 shrink-0">
                          <Code2 className="text-indigo-400" size={12} />
                      </div>
                      <div className="text-[13px] font-medium text-slate-200 truncate">
                          {artifacts[0]?.title}
                      </div>
                  </div>
              </div>
          </div>
      :<div>

      </div>  
      }  
      </motion.div>
  ); 

}

export default Artifact