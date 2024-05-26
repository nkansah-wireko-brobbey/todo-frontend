
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
import { Input } from "@/components/ui/input"
import { useAppSelector } from "@/lib/hooks/reduxStore.hooks"
import { useMutation } from "@apollo/client"
import { CREATE_CATEGORY } from "@/lib/graphql/mutations"
import client from '@/lib/apolloClient.config'
import { closeDrawer } from "@/store/reducers/drawer.slice"
import { useAppDispatch } from "@/lib/hooks/reduxStore.hooks"
import { useToast } from "./ui/use-toast"


export const CATEGORY_FORM = "CATEGORY_FORM";



const formSchema = z.object({

  name: z.string().min(2,{
    message: "a simple tag to your todo?",
  }).max(10),
})

export function AddTodoFormCategory() {
  const {toast} = useToast();

  function showToast (title?:string,description?:string) {
    toast({
      title: title ||"Uh oh! Something went wrong.",
      description: description || "There was a problem with your request.",
    })
  }

  const dispatch = useAppDispatch();  

   let {user_id} = useAppSelector((state) => state.user);

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        name: "",
      },
    })

      // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {    
    try {
      const { data } = await client.mutate({
        mutation: CREATE_CATEGORY,
        variables: {
          name: values.name,
          user_id: user_id,
        },
      });
      console.log("Category Added", data);
      showToast("Category Added","You have successfully added a new category")
      
      
    } catch (error) {
      console.error("Error creating category:", error);
      showToast("Error creating category","There was a problem creating a new category")
    } finally{
      
      dispatch(closeDrawer())

    }
    console.log(values)
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category Name</FormLabel>
              <FormControl>
                <Input placeholder="title" {...field} />
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />
       
        <Button type="submit">Create Category</Button>
      </form>
    </Form>
  )
}



export default AddTodoFormCategory