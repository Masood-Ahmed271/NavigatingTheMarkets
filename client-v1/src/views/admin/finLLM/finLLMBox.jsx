import { Text, Box, Heading } from "@chakra-ui/react";
import Card from "components/card/Card";
export default function WaitingBox(props) {
  return (
    <>
      <Card
        style={{
          border: "1px solid gray",
          marginTop: "20px",
          marginBottom: "20px",
          // width: "90%",
        }}
      >
        <Box w="500" p={5} shadow="sm">
          <Heading fontSize="xl">{props.title}</Heading>
          <Text mt={4}>{props.desc}</Text>
        </Box>
      </Card>
    </>
  );
}
