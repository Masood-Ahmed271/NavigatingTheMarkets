import { Box, Flex, Grid, Button, Stack, Text, Image } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import Signup from "components/SignUpLogin/Signup";
import Login from "components/SignUpLogin/Login";
import LoggedInImg from "assets/img/discussionForum/logged.png";

export default function WidgetPage() {
  const [signupTrue, setSignupTrue] = useState(false);
  const [loginTrue, setLoginTrue] = useState(true);
  const [isLoggedIn, setLoggedIn] = useState(false);

  const history = useHistory();

  useEffect(() => {
    const status = localStorage.getItem("Status");
    if (status !== null) {
      const parsedStatus = JSON.parse(status);
      if (parsedStatus === "logged In") {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    } else {
      setLoggedIn(false);
    }
  });

  const handleSignUpClick = () => {
    setSignupTrue(true);
    setLoginTrue(false);
  };

  const handleLoginClick = () => {
    setLoginTrue(true);
    setSignupTrue(false);
  };

  const handleLogout = () => {
    axios.get("http://127.0.0.1:5000/logout").then(function (response) {
      console.log(response);
      console.log(response.data);
      localStorage.setItem("Status", JSON.stringify("logged Out"));
      localStorage.setItem("UserId", JSON.stringify(""));
      localStorage.setItem("Username", JSON.stringify(""));
      setLoggedIn(false);
    });
  };

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
              mb="5px"
              justifyContent="center"
              direction={{ base: "column", md: "row" }}
              align={{ base: "start", md: "center" }}
            >
              <Stack direction="row" spacing={4} align="center">
                {!isLoggedIn ? (
                  <>
                    {" "}
                    <Button
                      colorScheme="teal"
                      variant="outline"
                      onClick={handleSignUpClick}
                    >
                      Sign Up
                    </Button>
                    <Button
                      colorScheme="twitter"
                      variant="outline"
                      onClick={handleLoginClick}
                    >
                      Login
                    </Button>
                  </>
                ) : (
                  <Button
                    colorScheme="twitter"
                    variant="outline"
                    onClick={handleLogout}
                  >
                    Log Out
                  </Button>
                )}
              </Stack>
            </Flex>
            <Stack align="center">
              {isLoggedIn ? (
                <>
                  <Text fontSize="4xl" as="b" mt="30px">
                    {" "}
                    Already Logged In
                  </Text>
                  <Image
                    boxSize="300px"
                    objectFit="cover"
                    src={LoggedInImg}
                    alt="Login Image"
                  />
                </>
              ) : signupTrue || loginTrue ? (
                signupTrue ? (
                  <Signup />
                ) : (
                  <Login />
                )
              ) : (
                ""
              )}
            </Stack>
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
