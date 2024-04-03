import {
    Button,
    Flex,
    Icon,
    Image,
    Link,
    Menu,
    MenuButton,
    MenuList,
    useColorModeValue,
} from "@chakra-ui/react";

import { SidebarResponsive } from "components/sidebar/Sidebar";
import PropTypes from "prop-types";
import React from "react";

import navImage from "assets/img/layout/Navbar.png";
import { MdInfoOutline } from "react-icons/md";

import routes from "routes.js";
import { ThemeEditor } from "./ThemeEditor";
export default function HeaderLinks(props) {
    const { secondary } = props;
    // Chakra Color Mode
    const navbarIcon = useColorModeValue("gray.400", "white");
    let menuBg = useColorModeValue("white", "navy.800");

    const shadow = useColorModeValue(
        "14px 17px 40px 4px rgba(112, 144, 176, 0.18)",
        "14px 17px 40px 4px rgba(112, 144, 176, 0.06)"
    );

    return (
        <Flex
            w={{ sm: "100%", md: "auto" }}
            alignItems="center"
            flexDirection="row"
            bg={menuBg}
            flexWrap={secondary ? { base: "wrap", md: "nowrap" } : "unset"}
            p="10px"
            borderRadius="30px"
            boxShadow={shadow}
        >
            <SidebarResponsive routes={routes} />

            {/* link to fyp website for more information and reports */}
            <Menu>
                <MenuButton p="0px">
                    <Icon
                        mt="6px"
                        as={MdInfoOutline}
                        color={navbarIcon}
                        w="18px"
                        h="18px"
                        me="10px"
                    />
                </MenuButton>
                <MenuList
                    boxShadow={shadow}
                    p="20px"
                    me={{ base: "30px", md: "unset" }}
                    borderRadius="20px"
                    bg={menuBg}
                    border="none"
                    mt="22px"
                    minW={{ base: "unset" }}
                    maxW={{ base: "360px", md: "unset" }}
                >
                    <Image
                        src={navImage}
                        width="450px"
                        height="250px"
                        borderRadius="16px"
                        mb="28px"
                    />
                    <Flex flexDirection="column">
                        <Link
                            w="100%"
                            href="https://wp2023.cs.hku.hk/fyp23070/"
                        >
                            <p>
                                We are a student led project aimed to
                                decentralize investing!
                            </p>
                            <br />
                            <Button w="100%" h="44px" mb="10px" variant="brand">
                                Learn More
                            </Button>
                        </Link>
                    </Flex>
                </MenuList>
            </Menu>

            <ThemeEditor navbarIcon={navbarIcon} />
        </Flex>
    );
}

HeaderLinks.propTypes = {
    variant: PropTypes.string,
    fixed: PropTypes.bool,
    secondary: PropTypes.bool,
    onOpen: PropTypes.func,
};
