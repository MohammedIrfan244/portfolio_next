import React, { useEffect } from 'react'
import { inter } from '@/lib/font'
import { IProject } from '@/lib/types'


function ProjectCard({ project }: { project: IProject }) {
    useEffect(()=>{
console.log(project)
    },[project])
  return (
    <div className={`${inter.className}`}>
      {project.title}
    </div>
  )
}

export default ProjectCard
