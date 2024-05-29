
"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Input } from "@/components/ui/input"
import { useAppSelector } from "@/lib/hooks/reduxStore.hooks"
import { useEffect } from "react"
import { fetchCategories } from "@/store/reducers/category.slice"
import { useAppDispatch } from "@/lib/hooks/reduxStore.hooks"
import { CREATE_TODO } from "@/lib/graphql/mutations"
import client from '@/lib/apolloClient.config'
import { closeDrawer } from "@/store/reducers/drawer.slice"
import { useToast } from "./ui/use-toast"




export const TODO_FORM = "add-todo-form";

type Props = {
  panel_id: number;
}

const formSchema = z.object({
  title: z.string().min(2,{
    message: "Enter the title of the todo",
  }).max(50),
  category: z.string().min(1,{
    message: "Select a category",
  }),
})

export function AddTodoForm({panel_id}:Props) {
  const dispatch = useAppDispatch();
   
  useEffect(() => {

  }
  ,[])

  let {data:categories} = useAppSelector((state) => state.categories);
  let {user_id} = useAppSelector((state) => state.user);

  const {toast} = useToast();

  function showToast (title?:string,description?:string) {
    toast({
      title: title ||"Uh oh! Something went wrong.",
      description: description || "There was a problem with your request.",
    })
  }


    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        title: "",
        category: "",
      },
    })

 async function onSubmit(values: z.infer<typeof formSchema>) {

  try {
    const { data } = await client.mutate({
      mutation: CREATE_TODO,
      variables: {
        title: values.title,
        user_id: user_id,
        category_id: parseInt(values.category),
        panel_id: panel_id,
      },
    });
    console.log("Todo Added", data);
    showToast("Todo Added","You have successfully added a new todo item")
    
    
  } catch (error) {
    console.error("Error creating todo item:", error);
    showToast("Error creating todo item","There was a problem creating a new todo item")
  } finally{
    
    dispatch(closeDrawer())

  }

    console.log(values, panel_id, user_id, parseInt(values.category))
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="title" {...field} />
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                { categories &&
                  categories.map((category:any) => {
                    return <SelectItem key={category.id} value={category.id.toString()}>{category.name}</SelectItem>
                  })
                }
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}


export default AddTodoForm