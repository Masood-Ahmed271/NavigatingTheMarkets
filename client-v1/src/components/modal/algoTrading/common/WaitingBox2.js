import { Text, Box } from '@chakra-ui/react'
import Card from 'components/card/Card'

export default function WaitingBox() {
    return (
        <Box p={10} style={{ marginBottom: 40, display: 'flex', alignItems: 'center' }}>
            <Card p="50px" w='60%' style={{ border: "1px solid gray", marginRight: "30px" }}>
                <Text as='i' mb='10px'> Mean Norm RMSE over 10 iterations</Text>
                <Text> ....... </Text>
            </Card>
            <Card p="50px" w='60%' style={{ border: "1px solid gray", marginRight: "30px" }}>
                <Text as='i' mb='10px'> Mean RMSE over 10 iterations </Text>
                <Text> ....... </Text>
            </Card>
            <Card p="50px" w='60%' style={{ border: "1px solid gray", marginRight: "30px" }}>
                <Text as='i' mb='10px'> Mean Mape over 10 iterations</Text>
                <Text> ....... </Text>
            </Card>
        </Box>
    );
}