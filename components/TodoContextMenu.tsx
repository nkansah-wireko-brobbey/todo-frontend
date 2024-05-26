import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuSubContent,
    DropdownMenuPortal,
  } from "@/components/ui/dropdown-menu"
import { UserPlus, Mail, MessageSquare, PlusCircle } from "lucide-react"

  import { Button } from "@/components/ui/button"
import { Ellipsis } from "lucide-react"
import { useEffect } from "react"
import { fetchCategories } from "@/store/reducers/category.slice"
import { fetchPanels } from "@/store/reducers/panel.slice"
import { useAppDispatch } from "@/lib/hooks/reduxStore.hooks"
import { useAppSelector } from "@/lib/hooks/reduxStore.hooks"  
import { useMutation } from "@apollo/client"
import { DELETE_TODO } from "@/lib/graphql/mutations"
import client from '@/lib/apolloClient.config'

type Props ={
    todos_id: number
}

const TodoContextMenu = ({todos_id}:Props) => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchCategories())
        dispatch(fetchPanels())  

      }
      ,[])

      let {data:categories} = useAppSelector((state) => state.categories);
      let panels: any[] = useAppSelector((state) => state.panels.data);

      const [mutateFunction, { loading, error, data }] = useMutation(DELETE_TODO);


      const deleteTodoHandler = async () => {
            try {
                console.log("Variable: ", todos_id)
                const { data } = await client.mutate({
                    mutation: DELETE_TODO,
                    variables: {
                      id: todos_id
                    },
                  });
 
                console.log("Data", data)
            }
            catch (error) {
                console.log("Error", error)
            }
            finally {
                console.log("Finally")
            }
        }


  return (
    <div><DropdownMenu>
    <DropdownMenuTrigger><div>
            <Button variant="ghost" size="icon" className='rounded-full h-7 w-7'
            onClick={() => {console.log('clicked')}}
            ><Ellipsis size={12}/></Button>

            </div></DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuLabel>Update Panels</DropdownMenuLabel>
      <DropdownMenuSeparator />
      {     panels &&
            panels.map((panel) => {
                return <DropdownMenuItem key={panel.id}>{panel.name}</DropdownMenuItem>
            })
      }
      <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <span>Update Category</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
              { categories &&
            categories.map((category) => {
                return <DropdownMenuItem key={category.id}>{category.name}</DropdownMenuItem>
            })
            }
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
     
      <DropdownMenuItem onClick={deleteTodoHandler}><span className="font-semibold text-red-700">Delete</span></DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
  </div>
  )
}

export default TodoContextMenu