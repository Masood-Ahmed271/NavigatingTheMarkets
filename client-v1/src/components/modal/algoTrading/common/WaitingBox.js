import { Text, Box } from '@chakra-ui/react'
import Card from 'components/card/Card'
export default function WaitingBox() {
    return (
        <Card style={{ border: "1px solid gray" }}>
            <Box w='500' p={40} >
                <Text> Waiting Until Training Begins....</Text>
            </Box>
        </Card>
    );
}