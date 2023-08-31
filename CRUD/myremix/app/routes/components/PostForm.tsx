import { Button, FormControl, Input } from "@chakra-ui/react";
import { Form, useNavigation } from "@remix-run/react";

export default function PostForm() {
  const { state } = useNavigation();

  return (
    <Form method="POST">
      <FormControl isRequired display="flex" gap={2} mb={'12px'}>
        <Input placeholder="Task to accomplished..." name="title" autoFocus border={'1px solid black'} boxShadow={'1px 1px 3px 1px yellow'}/>
        <Button type="submit" colorScheme="whatsapp">
          {state === "submitting" ? "Submitting..." : "Submit"}
        </Button>
      </FormControl>
    </Form>
  );
}