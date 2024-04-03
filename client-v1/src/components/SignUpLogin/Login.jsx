import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
// import { Route } from "react-router-dom";
// import { useNavigate, Route } from "react-router-dom";
import Card from "components/card/Card.js";

import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
function Login() {
  const textColor = useColorModeValue("navy.700", "white");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const history = useHistory();
  //   const navigate = useNavigate();

  const logInUser = () => {
    if (email.length === 0) {
      alert("Email has been left Blank!");
    } else if (password.length === 0) {
      alert("password has been left Blank!");
    } else if (username.length === 0) {
      alert("UserName has been left Blank!");
    } else {
      axios
        .post("http://127.0.0.1:5000/login", {
          email: email,
          password: password,
          username: username,
        })
        .then(function (response) {
          console.log(response);
          console.log(response.data);
          localStorage.setItem("Status", JSON.stringify("logged In"));
          localStorage.setItem("UserId", JSON.stringify(response.data.id));
          localStorage.setItem(
            "Username",
            JSON.stringify(response.data.username)
          );
          setPassword("");
          setUsername("");
          setEmail("");
          history.push("/admin/forum");
        })
        .catch(function (error) {
          console.log(error, "error");
          if (error.response.status === 401) {
            alert("Invalid credentials");
          }
        });
    }
  };

  return (
    <Container
      maxW="lg"
      py={{ base: "12", md: "24" }}
      px={{ base: "0", sm: "8" }}
    >
      <Stack spacing="8">
        <Stack spacing="6">
          <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
            <Heading size="xl">Log in to your account</Heading>
            {/* <Text color="fg.muted">
              Don't have an account? <Link href="#">Sign up</Link>
            </Text> */}
          </Stack>
        </Stack>
        <Card>
          <Box
            py={{ base: "0", sm: "8" }}
            px={{ base: "4", sm: "10" }}
            bg={{ base: "transparent", sm: "bg.surface" }}
            boxShadow={{ base: "none", sm: "md" }}
            borderRadius={{ base: "none", sm: "xl" }}
          >
            <Stack spacing="6">
              <Stack spacing="5">
                <FormControl>
                  <FormLabel htmlFor="username">UserName</FormLabel>
                  <Input
                    id="username"
                    type="text"
                    defaultValue={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input
                    id="email"
                    type="email"
                    defaultValue={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    defaultValue={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormControl>
              </Stack>
              <Stack spacing="6">
                <Button
                  onClick={logInUser}
                  colorScheme="twitter"
                  variant="outline"
                >
                  Sign in
                </Button>
                <HStack>
                  <Divider />
                  <Divider />
                </HStack>
              </Stack>
            </Stack>
          </Box>
        </Card>
      </Stack>
    </Container>
  );
}

export default Login;
