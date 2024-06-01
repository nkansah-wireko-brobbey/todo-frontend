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
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { Ellipsis } from "lucide-react";
import { useAppSelector } from "@/lib/hooks/reduxStore.hooks";
import { useMutation } from "@apollo/client";
import {
  DELETE_TODO,
  UPDATE_TODO_CATEGORY,
  UPDATE_TODO_PANEL,
} from "@/lib/graphql/mutations";
import client from "@/lib/apolloClient.config";
import { useFetchCategories } from "@/lib/hooks/useFetchCategories.hook";

type Props = {
  todos_id: number;
};

export function TodoContextMenu({ todos_id }: Props) {
  const categories = useFetchCategories();
  const [
    updateCategory,
    { data: updateCategoryData, error: updateCategoryError },
  ] = useMutation(UPDATE_TODO_CATEGORY);
  const [deleteTodo, { data: deleteData, error: deleteError }] =
    useMutation(DELETE_TODO);
  const [updatePanel, { data: updatePanelData, error: updatePanelError }] =
    useMutation(UPDATE_TODO_PANEL);

  let panels: any[] = useAppSelector((state) => state.panels.data);

  const deleteTodoHandler = async () => {
    try {
      console.log("Variable: ", todos_id);
  
      await deleteTodo({
        variables: {
          id: todos_id,
        },
      })

      console.log("Data", deleteData);
    } catch (error) {
      console.log("Error", error);
    } finally {
      console.log("Finally");
    }
  };
  const updateTodoPanelHandler = async (panel_id: number) => {
    try {
      console.log("Variable: ", todos_id);
      // const { data } = await client.mutate({
      //   mutation: UPDATE_TODO_PANEL,
      //   variables: {
      //     id: todos_id,
      //     panel_id: panel_id,
      //   },
      // });

      await updatePanel({
        variables: {
          id: todos_id,
          panel_id: panel_id,
        }
      });

      console.log("Data", updatePanelData);
    } catch (error) {
      console.log("Error", error);
    } finally {
      console.log("Finally");
    }
  };
  const updateTodoCategoryHandler = async (category_id: number) => {
    try {
      console.log("Variable: ", todos_id);
      // const { data } = await client.mutate({
      //   mutation: UPDATE_TODO_CATEGORY,
      //   variables: {
      //     id: todos_id,
      //     category_id: category_id,
      //   },
      // });

      await updateCategory({
        variables: {
          id: todos_id,
          category_id: category_id,
        }
      })

      console.log("Data", updateCategoryData);
    } catch (error) {
      console.log("Error", error);
    } finally {
      console.log("Finally");
    }
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full h-7 w-7"
              onClick={() => {
                console.log("clicked");
              }}
            >
              <Ellipsis size={12} />
            </Button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Update Panels</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {panels &&
            panels.map((panel) => {
              return (
                <DropdownMenuItem
                  key={panel.id}
                  onClick={() => {
                    updateTodoPanelHandler(panel.id);
                  }}
                >
                  {panel.name}
                </DropdownMenuItem>
              );
            })}
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <span>Update Category</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                {categories &&
                  categories.map((category) => {
                    return (
                      <DropdownMenuItem
                        key={category.id}
                        onClick={() => {
                          updateTodoCategoryHandler(category.id);
                        }}
                      >
                        {category.name}
                      </DropdownMenuItem>
                    );
                  })}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>

          <DropdownMenuItem onClick={deleteTodoHandler}>
            <span className="font-semibold text-red-700">Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default TodoContextMenu;
