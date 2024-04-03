import {
  Box,
  Flex,
  Stack,
  Text,
  Button,
  List,
  Image,
  Textarea,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Collapsible from "components/collapsible/Collapisble";
import LoginImg from "assets/img/discussionForum/login.png";
import Card from "components/card/Card";

export default function WidgetPage() {
  const textColor = useColorModeValue("navy.700", "white");
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [topics, setTopics] = useState(null);
  const [isData, setData] = useState(false);

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
    if (isLoggedIn) {
      axios
        .get("http://127.0.0.1:5000/all-topics")
        .then(function (response) {
          console.log(response);
          console.log(response.data);
          setTopics(response.data);
          setData(true);
        })
        .catch(function (error) {
          console.log(error, "error");
          if (error.response.status === 401) {
            alert("Some Error Occurred, please retry later");
          }
        });
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    axios.get("http://127.0.0.1:5000/logout").then(function (response) {
      console.log(response);
      console.log(response.data);
      localStorage.setItem("Status", JSON.stringify("logged Out"));
      localStorage.setItem("UserId", JSON.stringify(""));
      localStorage.setItem("Username", JSON.stringify(""));
      setLoggedIn(false);
      history.push("/admin/login");
    });
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleTopicSubmit = async () => {
    const userId = localStorage.getItem("UserId");
    const userName = localStorage.getItem("Username");

    // Validation Checks
    if (!title || !description || !userId || !userName) {
      alert("Please enter a title and description.");
      return;
    }

    axios
      .post("http://127.0.0.1:5000/all-topics", {
        title: title,
        description: description,
        userId: userId,
        userName: userName,
      })
      .then(function (response) {
        console.log(response);
        console.log(response.data);
        setTopics(response.data);
        setData(true);
        setTitle("");
        setDescription("");
      })
      .catch(function (error) {
        console.log(error, "error");
        if (error.response.status === 401) {
          alert("Some Error Occurred, please retry later");
        }
      });
  };

  return (
    <Box style={{ marginTop: 100 }}>
      <Flex
        flexDirection="column"
        gridArea={{ xl: "1 / 1 / 2 / 3", "2xl": "1 / 1 / 2 / 2" }}
      >
        <Flex direction="column" align="center">
          <Flex
            mt="65px"
            mb="40px"
            // justifyContent="center"
            style={{ width: "100%" }}
          >
            <Stack
              direction="row"
              spacing={4}
              style={{
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              {isLoggedIn ? (
                <>
                  <Text style={{ marginRight: 10 }} as="b" fontSize="3xl">
                    {" "}
                  </Text>
                  <Button
                    colorScheme="twitter"
                    variant="outline"
                    onClick={handleLogout}
                  >
                    Log Out
                  </Button>
                </>
              ) : (
                ""
              )}
            </Stack>
          </Flex>
          <Stack align="center">
            {isLoggedIn ? (
              <>
                <Card p="20px">
                  <Box
                    w="100%"
                    h="70%"
                    style={{
                      borderBottomLeftRadius: 10,
                      marginBottom: 50,
                      display: "flex",
                      alignContent: "center",
                      flexDirection: "column",
                    }}
                  >
                    <Text as="b" fontSize="3xl" style={{ textAlign: "center" }}>
                      {" "}
                      Add A Topic For Discussion{" "}
                    </Text>
                    <Stack direction="column" style={{ width: "100%" }}>
                      <Text as="b" style={{ marginBottom: "3%" }}>
                        Title
                        <Textarea
                          value={title}
                          onChange={handleTitleChange}
                          placeholder="Please enter the title of your post"
                          size="sm"
                        />
                      </Text>
                      <Text as="b">
                        Description
                        <Textarea
                          value={description}
                          onChange={handleDescriptionChange}
                          placeholder="Please add description for your post"
                          size="sm"
                        />
                      </Text>
                    </Stack>
                    <Button
                      colorScheme="yellow"
                      variant="outline"
                      onClick={handleTopicSubmit}
                      style={{
                        marginTop: "30px",
                        width: "60%",
                        alignItems: "center",
                        marginLeft: "20%",
                      }}
                    >
                      Submit
                    </Button>
                  </Box>
                </Card>
                <Box style={{ marginTop: "7%" }}>
                  <Text as="b" fontSize="2xl">
                    {" "}
                    Check Topics Under Discussion!{" "}
                  </Text>
                  <hr
                    style={{
                      background: { textColor },
                      color: { textColor },
                      borderColor: { textColor },
                      height: "3px",
                      marginBottom: "5%",
                    }}
                  />
                  {isData ? (
                    <List spacing={3}>
                      {topics.map((topic) => (
                        <Collapsible
                          key={topic.id}
                          title={topic.title}
                          author={topic.username}
                          id={topic.id}
                        >
                          <Text>{topic.description}</Text>
                        </Collapsible>
                      ))}
                    </List>
                  ) : (
                    <Text> Please add a topic to start a discussion!</Text>
                  )}
                </Box>
              </>
            ) : (
              <>
                <Text fontSize="4xl" as="b">
                  {" "}
                  Please Login First
                </Text>
                <Image
                  boxSize="300px"
                  objectFit="cover"
                  src={LoginImg}
                  alt="Login Image"
                />
              </>
            )}
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
}
