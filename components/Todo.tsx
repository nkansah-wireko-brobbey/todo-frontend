import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import TodoContextMenu from "@/components/TodoContextMenu";
import { useEffect, useState } from "react";
import colors from "@/lib/colors";
import { getColor } from "@/lib/colors";
import { useAuth } from "@clerk/nextjs";


interface TodoData {
  title: string;
  id: number;
  date: Date;
  category: {
    name?: string;
    color_id?: number;
  };
}

type Props = {
  data: TodoData;
};

const Todo = ({ data }: Props) => {
  console.log("Todo data", data);
  const [color, setColor] = useState(colors[4]); // default color [gray]
  useEffect(() => {
    setColor(getColor(data.category?.color_id));
  }, []);

  const { isLoaded, userId, sessionId, getToken } = useAuth();
    
  return (
    <div>
      <Card>
        <CardHeader className="text-sm p-2">
          <CardTitle className="text-sm">
            <Badge
              variant="secondary"
              className={`bg-green-200 text-green-700 float-start`}
            >
              {data.category?.name || "Not Assigned"}
            </Badge>
            <div className="float-end">
              <TodoContextMenu todos_id={data.id} />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm p-2">
          <p> {data.title}</p>
        </CardContent>
        <CardFooter className="text-sm p-2">
          Token: {userId}
        </CardFooter>
      </Card>
    </div>
  );
};

export default Todo;
