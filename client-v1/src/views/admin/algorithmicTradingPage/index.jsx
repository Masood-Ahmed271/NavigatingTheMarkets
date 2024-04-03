import {
  Box,
  Flex,
  Grid,
  Text,
  useColorModeValue,
  SimpleGrid,
} from "@chakra-ui/react";

// import RNNImg from "assets/img/algoTrading/lstm.png";
import RNNImg from "assets/img/algoTrading/Rnn.png";
import LstmSingleLayer from "assets/img/algoTrading/lstm_single_layer.png";
import GruSingleLayer from "assets/img/algoTrading/gru_single_layer.png";
import LstmTwoLayer from "assets/img/algoTrading/lstm_two_layer.png";
import GruTwoLayer from "assets/img/algoTrading/gru_two_layer.png";
import LstmThreeLayer from "assets/img/algoTrading/lstm_three_layer.png";
import GruThreeLayer from "assets/img/algoTrading/gru_three_layer.png";
import Autoencoder from "assets/img/algoTrading/autoencoder.png";
import AnnImg from "assets/img/algoTrading/ANN.jpg";
import Special from "assets/img/algoTrading/Special.webp";

import LstmCard from "components/card/algoTrading/Lstm";
import LSTMModalOne from "components/card/algoTrading/LstmOne";
import LSTMModalTwo from "components/card/algoTrading/LstmTwo";
import LSTMModalThree from "components/card/algoTrading/LstmThree";
import GRUModalOne from "components/card/algoTrading/GruOne";
import GRUModalTwo from "components/card/algoTrading/GruTwo";
import GRUModalThree from "components/card/algoTrading/GruThree";
import RnnModal from "components/card/algoTrading/Rnn";
import AutoEncoder from "components/card/algoTrading/AutoEncoder";
import Ann from "components/card/algoTrading/Ann";

export default function WidgetPage() {
  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");

  return (
    <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
      {/* Main Fields */}
      <Grid
        mb="20px"
        gridTemplateColumns={{
          xl: "repeat(2, 1fr)",
          "2xl": "1fr 0.46fr",
        }}
        gap={{ base: "20px", xl: "20px" }}
        display={{ base: "block", xl: "grid" }}
      >
        <Flex
          flexDirection="column"
          gridArea={{ xl: "1 / 1 / 2 / 3", "2xl": "1 / 1 / 2 / 2" }}
        >
          <Flex direction="column">
            <Flex
              mt="45px"
              mb="20px"
              justifyContent="space-between"
              direction={{ base: "column", md: "row" }}
              align={{ base: "start", md: "center" }}
            >
              <Text color={textColor} fontSize="2xl" ms="24px" fontWeight="700">
                Explore
              </Text>
            </Flex>
            <SimpleGrid columns={{ base: 1, md: 3 }} gap="20px">
              <LstmCard
                modelName="LSTM"
                fullModelName="Long Short-Term Memory - A Special Feature to Explore the Financial Industry More!"
                image={Special}
              />

              <LSTMModalOne
                modelName="LSTM Model One"
                fullModelName="Long Short-Term Memory - Single Layer Architecture"
                image={LstmSingleLayer}
              />

              <LSTMModalTwo
                modelName="LSTM Model Two"
                fullModelName="Long Short-Term Memory - Two Layers Architecture"
                image={LstmTwoLayer}
              />

              <LSTMModalThree
                modelName="LSTM Model Three"
                fullModelName="Long Short-Term Memory - Three Layers Architecture"
                image={LstmThreeLayer}
              />

              <GRUModalOne
                modelName="GRU Model One"
                fullModelName="Gated Recurrent Units - Single Layer Architecture"
                image={GruSingleLayer}
              />

              <GRUModalTwo
                modelName="GRU Model Two"
                fullModelName="Gated Recurrent Units - Two Layers Architecture"
                image={GruTwoLayer}
              />

              <GRUModalThree
                modelName="GRU Model Three"
                fullModelName="Gated Recurrent Units - Three Layers Architecture"
                image={GruThreeLayer}
              />

              <RnnModal
                modelName="RNN"
                fullModelName="Recurrent Neural Network"
                image={RNNImg}
              />

              <AutoEncoder
                modelName="Autoencoder"
                fullModelName="Autoencoder Model"
                image={Autoencoder}
              />

              <Ann
                modelName="ANN"
                fullModelName="Artificial Neural Network Model"
                image={AnnImg}
              />
            </SimpleGrid>
          </Flex>
        </Flex>
        <Flex
          flexDirection="column"
          gridArea={{ xl: "1 / 3 / 2 / 4", "2xl": "1 / 2 / 2 / 3" }}
        ></Flex>
      </Grid>
    </Box>
  );
}
