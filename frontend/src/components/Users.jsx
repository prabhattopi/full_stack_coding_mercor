import React from 'react'
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

const userData = [
  { user: "User 1", response: "Response 1" },
  { user: "User 2", response: "Response 2" },
  { user: "User 3", response: "Response 3" },
  // Add more user data here
];
const Users = () => {
    return (
        <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>User</Th>
            <Th>Response</Th>
          </Tr>
        </Thead>
        <Tbody>
          {userData.map((data, index) => (
            <Tr key={index}>
              <Td>{data.user}</Td>
              <Td>{data.response}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    )
}

export default Users
