import React, { useEffect } from 'react'
import { youngSerif } from '@/lib/font'
import { IProject } from '@/lib/types'


function ProjectCard({ project }: { project: IProject }) {
    useEffect(()=>{
console.log(project)
    },[project])
  return (
    <div className={`${youngSerif.className}`}>
      
    </div>
  )
}

export default ProjectCard
