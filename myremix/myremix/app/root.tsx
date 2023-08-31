import { ChakraProvider } from "@chakra-ui/react"
import {Document} from "./Document"
import { Outlet } from "@remix-run/react"
export default function App() {
  return (
    <Document>
      <ChakraProvider>
        <Outlet />
      </ChakraProvider>
    </Document>
  )
}