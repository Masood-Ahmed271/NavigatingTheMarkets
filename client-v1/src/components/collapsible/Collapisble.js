import React, { useState, useEffect } from "react";
import { FaChevronUp, FaChevronDown, FaComment } from "react-icons/fa";
import {
    Button,
    Icon,
    Stack,
    Text,
    Textarea,
    Box,
    List,
    useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";
import { MdTopic } from "react-icons/md";
import Card from "components/card/Card.js";

const Collapsible = ({ children, title, author, id }) => {
    const textColor = useColorModeValue("navy.700", "white");
    const [isOpen, setIsOpen] = useState(false);
    const [comments, setComments] = useState(null);
    const [isData, setData] = useState(false);
    const [userComment, setUserComment] = useState("");

    let handleInputCommentChange = (e) => {
        let inputValue = e.target.value;
        setUserComment(inputValue);
    };

    useEffect(() => {
        if (id) {
            const commentApi = "http://127.0.0.1:5000/topic/" + id;
            axios
                .get(commentApi)
                .then(function (response) {
                    console.log(response);
                    console.log(response.data);
                    if (response.data != null) {
                        setComments(response.data);
                        setData(true);
                    }
                })
                .catch(function (error) {
                    console.log(error, "error");
                    if (error.response.status === 401) {
                        alert("Some Error Occurred, please retry later");
                    }
                });
        }
    }, [isOpen]);

    const handleFilterOpening = () => {
        setIsOpen((prev) => !prev);
    };

    const postComment = () => {
        const userId = localStorage.getItem("UserId");
        const userName = localStorage.getItem("Username");
        const commentapi = "http://127.0.0.1:5000/topic/" + id;

        // Validation Checks
        if (!userComment || !userId || !userName) {
            alert("Please enter a title and description.");
            return;
        }

        axios
            .post(commentapi, {
                text: userComment,
                userId: userId,
                userName: userName,
            })
            .then(function (response) {
                console.log(response);
                console.log(response.data);
                setComments(response.data);
                setData(true);
                setUserComment("");
            })
            .catch(function (error) {
                console.log(error, "error");
                if (error.response.status === 401) {
                    alert("Some Error Occurred, please retry later");
                }
            });
    };

    return (
        <>
            <div
                style={{
                    width: "700px",
                    borderRadius: 10,
                    paddingBottom: 10,
                    border: "1px solid gray"
                }}
            >
                <div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}
                    >
                        <div
                            style={{ display: "flex", flexDirection: "row", marginTop: 10 }}
                        >
                            <Icon
                                as={MdTopic}
                                width="20px"
                                height="20px"
                                color="inherit"
                                style={{ marginLeft: 30, marginTop: 30, marginRight: 10 }}
                            />
                            <Text
                                as="b"
                                style={{ marginRight: 10, marginTop: 30 }}
                                color={textColor}
                            >
                                {title}
                            </Text>
                            <Text
                                as="i"
                                style={{ marginRight: 30, marginTop: 30 }}
                                color="secondaryGray.600"
                            >
                                {" "}
                                by {author}
                            </Text>
                        </div>
                        <div>
                            <Button onClick={handleFilterOpening} style={{ margin: 30 }}>
                                {!isOpen ? (
                                    <Icon
                                        as={FaChevronDown}
                                        width="20px"
                                        height="20px"
                                        color="inherit"
                                    />
                                ) : (
                                    <Icon
                                        as={FaChevronUp}
                                        width="20px"
                                        height="20px"
                                        color="inherit"
                                    />
                                )}
                            </Button>
                        </div>
                    </div>
                </div>

                <div>
                    <div>
                        {isOpen && (
                            <div>
                                <Box w="80%" style={{ marginLeft: 30 }}>
                                    <Text as="u" style={{ margin: 20 }} color={textColor}>
                                        {" "}
                                        Description:{" "}
                                    </Text>
                                    <Text
                                        style={{
                                            margin: 20,
                                            border: "gray solid",
                                            borderRadius: 5,
                                            padding: 10,
                                        }}
                                        color={textColor}
                                    >
                                        {children}
                                    </Text>
                                </Box>
                                {isData ? (
                                    <>
                                        <List>
                                            {comments.map((comment) => (
                                                <>
                                                    <Box
                                                        w="80%"
                                                        style={{
                                                            borderBottom: "1px solid gray",
                                                            marginLeft: 50,
                                                            marginBottom: 30,
                                                            marginTop: 20,
                                                            display: "flex",
                                                            flexDirection: "column",
                                                        }}
                                                    >
                                                        <Box
                                                            style={{ display: "flex", flexDirection: "row" }}
                                                        >
                                                            <Icon
                                                                as={FaComment}
                                                                width="20px"
                                                                height="20px"
                                                                color="inherit"
                                                                style={{ marginRight: 10 }}
                                                            />
                                                            <Text as="i" color="secondaryGray.600">
                                                                {" "}
                                                                {comment.username}
                                                            </Text>
                                                        </Box>
                                                        <Text style={{ marginLeft: 30 }} color={textColor}>
                                                            {" "}
                                                            {comment.text} {""}{" "}
                                                        </Text>
                                                    </Box>
                                                </>
                                            ))}
                                        </List>
                                    </>
                                ) : (
                                    <>
                                        {" "}
                                        <Box
                                            w="80%"
                                            p={4}
                                            color="black"
                                            style={{ borderBottom: "1px solid black", margin: 50 }}
                                        >
                                            <Text color={textColor}> No Comments Yet! </Text>
                                        </Box>
                                    </>
                                )}
                                <Stack
                                    direction="row"
                                    style={{ marginLeft: 50, marginRight: 50, marginBottom: 50 }}
                                >
                                    <Textarea
                                        value={userComment}
                                        onChange={handleInputCommentChange}
                                        placeholder="Add your comment"
                                        size="sm"
                                        color={textColor}
                                    />
                                    <Button style={{ marginTop: "3%" }} onClick={postComment}
                                        colorScheme="telegram"
                                        variant="outline">
                                        Post Comment
                                    </Button>
                                </Stack>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Collapsible;
