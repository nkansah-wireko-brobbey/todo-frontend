import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

  import { Button } from "@/components/ui/button"
import { Ellipsis } from "lucide-react"
  
type Props ={
    todos_id: number
}

const TodoContextMenu = ({todos_id}:Props) => {
  return (
    <div><DropdownMenu>
    <DropdownMenuTrigger><div>
            <Button variant="ghost" size="icon" className='rounded-full h-7 w-7'
            onClick={() => {console.log('clicked')}}
            ><Ellipsis size={12}/></Button>

            </div></DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuLabel>Menu</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem>Profile</DropdownMenuItem>
      <DropdownMenuItem>Billing</DropdownMenuItem>
      <DropdownMenuItem>Team</DropdownMenuItem>
      <DropdownMenuItem><span className="font-semibold text-red-700">Delete</span></DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
  </div>
  )
}

export default TodoContextMenu