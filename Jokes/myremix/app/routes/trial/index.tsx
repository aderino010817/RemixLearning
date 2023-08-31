import { Box, Button, Input, ListItem, Text, UnorderedList } from '@chakra-ui/react';
import type { ActionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { createPostSchema } from "~/modules/posts.schema";
import { createPost, deletePost, getPosts, updatePost } from "~/modules/posts.service";
import PostForm from "../components/PostForm";

  export async function loader() {
    return await getPosts()
  }
  
  export async function action({ request }: ActionArgs) {
    if (request.method.toLowerCase() === "post") {
      const formData = await request.formData();
  
      const title = formData.get("title") as string;
  
      const validatedData = createPostSchema.parse({
        title,
      });
  
      await createPost(validatedData);
    }
  
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
  
  export default function Posts() {
    const data = useLoaderData<typeof loader>();
  
    return (
        <Box display={'flex'} justifyContent={'center'}>
      <Box margin="30px" border={'1px solid grey'} boxShadow={'1px 1px 4px 1px yellow'}>
        <Box mt='10px' mr={'10px'} ml={'10px'}>
            <PostForm />
        </Box>
        <Box display="flex" width="100%" flexDirection="column">
          <Text bgColor={'green'} textAlign={'center'}><em>a few list of idiotic ideas, such as</em></Text>
          <UnorderedList listStyleType="none">
            {data.map((post) => (
              <ListItem
                key={post.id}
                display="flex"
                alignItems="center"
                gap={2}
                marginBottom="5px"
                justifyContent={'space-between'}
                paddingRight={'20px'}
                mt={'10px'}
                mb={'10px'}
                
              >
                <Box display="flex" alignItems={"center"} flex={10} gap={1}>
                  <Link to={"/detail/" + post.id}><Text>{post.title}</Text></Link>
                </Box>
                <Box display="flex" flex={2} justifyContent="flex-end">
                  <Form method="DELETE">
                    <Input type="hidden" name="id" value={post.id} />
                    <Button type="submit" colorScheme="red">DELETE
                    </Button>
                  </Form>
                </Box>
              </ListItem>
            ))}
          </UnorderedList>
        </Box>
      </Box>
      </Box>
    );
  }