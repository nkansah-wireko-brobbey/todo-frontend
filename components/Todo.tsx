import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { Badge } from "@/components/ui/badge"


  
const Todo = () => {
  return (
    <div>
        <Card>
  <CardHeader className="text-sm p-2">
    <CardTitle className="text-sm"><Badge variant="secondary" className="bg-green-200 text-green-700">Badge</Badge>
</CardTitle>
  </CardHeader>
  <CardContent className="text-sm p-2">
    <p>Card Content Card Content</p>
  </CardContent>
  <CardFooter className="text-sm p-2">
    
  </CardFooter>
</Card>

    </div>
  )
}

export default Todo