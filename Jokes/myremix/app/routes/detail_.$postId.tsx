import { Box, Button, Center, FormControl, Input } from "@chakra-ui/react";
import { ActionArgs, LoaderArgs, redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { deletePost, unique, updatePost } from "~/modules/posts.service";


export async function loader({params}: LoaderArgs) {
  return await unique(Number(params.postId))
}

export async function action({ request }: ActionArgs) {

  if (request.method.toLowerCase() === "delete") {
    const formData = await request.formData();
    const id = +(formData.get("id") as string);

    await deletePost(id);
  }

  if (request.method.toLowerCase() === "patch") {
    const formData = await request.formData();

    const id = +(formData.get("id") as string);
    const title = (formData.get("title") as string);

    console.log(id);

    const validatedData = ({
      id,
      title,
    });

    await updatePost(validatedData);
  }

  return redirect("/trial");
}

export default function DetailTitle() {
  const data = useLoaderData<typeof loader>()

  return (
    <>
    <Box margin={'40px'}>
      <Box width={'100%'}>
        <Center>
          <Form method="PATCH">
            <FormControl border={'1px solid grey'} boxShadow={'1px 1px 3px 1px purple'}>
              <Center flexDirection={'column'} margin={'30px'} padding={'10px'}>
                <Center>
                  <Input type='text' name="title" textAlign={'center'} defaultValue={data?.title} />
                </Center>
                <Center mt={'1em'} flexDirection={'row'}>
                  <Input type="hidden" name="id" value={data?.id} />
                  <Button type="submit" size={'sm'} mr={'1em'} border={'1px solid grey'} boxShadow={'1px 1px 3px 1px purple'}>Edit</Button>
                </Center>
              </Center>
            </FormControl>
          </Form>
        </Center>
      </Box>
    </Box>
    </>
  )
}