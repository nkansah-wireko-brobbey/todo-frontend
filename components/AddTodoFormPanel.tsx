"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAppSelector } from "@/lib/hooks/reduxStore.hooks";
import { useMutation } from "@apollo/client";
import { CREATE_CATEGORY, CREATE_PANEL } from "@/lib/graphql/mutations";
import client from "@/lib/apolloClient.config";
import { closeDrawer } from "@/store/reducers/drawer.slice";
import { useAppDispatch } from "@/lib/hooks/reduxStore.hooks";
import { useToast } from "./ui/use-toast";

export const PANEL_FORM = "PANEL_FORM";

const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "enter a simple name for the panel?",
    })
    .max(15),
});

export function AddTodoFormPanel() {
  const { toast } = useToast();

  const [addPanel, { data, error }] = useMutation(CREATE_PANEL);

  function showToast(title?: string, description?: string) {
    toast({
      title: title || "Uh oh! Something went wrong.",
      description: description || "There was a problem with your request.",
    });
  }

  const dispatch = useAppDispatch();

  let { user_id } = useAppSelector((state) => state.user);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // const { data } = await client.mutate({
      //   mutation: CREATE_PANEL,
      //   variables: {
      //     name: values.name,
      //     user_id: user_id,
      //   },
      // });

      await addPanel({
        variables: {
          name: values.name,
          user_id: user_id,
        }
      });


      console.log("Panel Added", data);
      showToast("Panel Added", "You have successfully added a new panel");
    } catch (error) {
      console.error("Error creating panel:", error);
      showToast(
        "Error creating panel",
        "There was a problem creating a new panel"
      );
    } finally {
      dispatch(closeDrawer());
    }
    console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Panel Name</FormLabel>
              <FormControl>
                <Input placeholder="Panel name" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Create Panel</Button>
      </form>
    </Form>
  );
}

export default AddTodoFormPanel;
