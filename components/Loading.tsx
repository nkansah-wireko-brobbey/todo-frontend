import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"


export const BoardLoading = () => {
  return (
    <div className="w-[calc(100vw)]">
      <div className="board justify-between flex-wrap w-full">
        <CardLoading />
        <CardLoading />
        <CardLoading />
        <CardLoading />
      </div>
    </div>
  );
}
export const PanelLoading = () => {
  return (
    <div>Loading</div>
  )
}

const CardLoading = () => {
    return (
        <div>   
        <div className="flex flex-col space-y-3">
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
  
          </div>
        </div>
    )
    }

