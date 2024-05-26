import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { Badge } from "@/components/ui/badge"
  import TodoContextMenu from "@/components/TodoContextMenu"

interface TodoData{
    title: string;
    id: number;
    date: Date;
    category: {
        name?: string;
    }
}

type Props = {
  data: TodoData
}
  
const Todo = ({data}: Props) => {

  console.log("Todo data",data)
  return (
    <div>
        <Card>
  <CardHeader className="text-sm p-2">
    <CardTitle className="text-sm">
      <Badge variant="secondary" className="bg-green-200 text-green-700 float-start">{data.category?.name || "Not Assigned"}</Badge>
      <div className="float-end">
      <TodoContextMenu todos_id={data.id} />
      </div>
</CardTitle>
  </CardHeader>
  <CardContent className="text-sm p-2">
    <p>      {data.title}
</p>
  </CardContent>
  <CardFooter className="text-sm p-2">
    
  </CardFooter>
</Card>

    </div>
  )
}

export default Todo