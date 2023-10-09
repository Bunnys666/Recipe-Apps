"use client";
import { useForm, zodResolver } from "@mantine/form";
import { Button, Group, TextInput, Box, Textarea } from "@mantine/core";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { z } from "zod";
import classes from "~/styles/DropzoneButton.module.css";
import { ConciergeBell, ArrowRight } from "lucide-react";

const schema = z.object({
  title: z
    .string()
    .min(5, { message: "Title should have at least 5 letters" })
    .max(15, { message: "Title should max at least 15 letters" })
    .nonempty(),
  type: z
    .string()
    .min(5, { message: "Type Crash should have at least 5 letters" })
    .max(15, { message: "Type Crash should max at least 15 letters" })
    .nonempty(),
  description: z
    .string()
    .min(5, { message: "Type Crash should have at least 5 letters" })
    .max(50, { message: "Type Crash should max at least 50 letters" })
    .nonempty(),
});

export default function index() {
  const router = useRouter();

  const createReport = api.recipeRouter.created.useMutation({
    onSuccess: () => {
      void router.push("/report");
    },
  });
  const form = useForm({
    validate: zodResolver(schema),
    initialValues: {
      name: "",
      type: "",
      description: "",
      ingredient: "",
    },
  });

  const createValues = (values: {
    name: string;
    type: string;
    ingredient: string;
    description: string;
  }) => {
    void createReport.mutateAsync({
      name: values.name,
      type: values.type,
      ingredient: values.ingredient,
      description: values.description,
    });
  };
  return (
    <>
      <div className={classes.wrapper}>
        <h3 className="mb-8 flex items-center justify-center text-5xl font-bold">
          <ConciergeBell color="#ffd478" width={100} height={70} /> Add Recipe
        </h3>

        <Box maw={340} mx="auto">
          <form
            onSubmit={form.onSubmit((values) => {
              createValues(values);
              form.reset();
            })}
          >
            <TextInput
              label="Recipe Title"
              placeholder="chicken"
              withAsterisk
              {...form.getInputProps("name")}
            />
            <TextInput
              label="Type of Report"
              placeholder="@ex: Pipe"
              withAsterisk
              {...form.getInputProps("type")}
            />
            <Textarea
              placeholder="maximum 50 characters"
              label="Description about your ingredients"
              autosize
              withAsterisk
              minRows={2}
              {...form.getInputProps("ingredient")}
            />
            <Textarea
              placeholder="maximum 50 characters"
              label="Description about your recipe"
              autosize
              withAsterisk
              minRows={2}
              {...form.getInputProps("description")}
            />
            <Group justify="flex-start" mt="md">
              <Button type="submit">
                Added <ArrowRight size={25} color="#ff7d78" className="ml-3" />
              </Button>
            </Group>
          </form>
        </Box>
      </div>
    </>
  );
}
