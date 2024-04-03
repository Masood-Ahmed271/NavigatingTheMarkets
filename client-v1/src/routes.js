import React from "react";

import { Icon } from "@chakra-ui/react";
import TradingAgentsPage from "views/admin/tradingAgentsPage";
import { MdChat, MdLogin, MdCalendarViewDay, MdCurrencyExchange, MdAutoGraph, MdOutlineIntegrationInstructions } from "react-icons/md";
import Widget from "views/admin/widgetPage";
import AlgorithmicTrading from "views/admin/algorithmicTradingPage";
import FinLLM from "views/admin/finLLM";
import DiscussionForum from "views/admin/discussionForum";
import SignUpLogin from "views/admin/signUpLogin";

const routes = [
    {
        name: "Widgets",
        layout: "/admin",
        path: "/default",
        icon: (
            <Icon
                as={MdCalendarViewDay}
                width="20px"
                height="20px"
                color="inherit"
            />
        ),
        component: Widget,
        secondary: true,
    },
    {
        name: "Algorithmic Trading",
        layout: "/admin",
        icon: (
            <Icon as={MdAutoGraph} width="20px" height="20px" color="inherit" />
        ),
        path: "/algotrading",
        component: AlgorithmicTrading,
    },
    {
        name: "Trading Agents",
        layout: "/admin",
        icon: <Icon as={MdCurrencyExchange} width="20px" height="20px" color="inherit" />,
        path: "/tradingagents",
        component: TradingAgentsPage,
    },
    {
        name: "FinLLM",
        layout: "/admin",
        path: "/finllm",
        icon: (
            <Icon as={MdOutlineIntegrationInstructions} width="20px" height="20px" color="inherit" />
        ),
        component: FinLLM,
    },
    {
        name: "Sign Up - Login",
        layout: "/admin",
        path: "/login",
        icon: <Icon as={MdLogin} width="20px" height="20px" color="inherit" />,
        component: SignUpLogin,
    },
    {
        name: "Discussion Forum",
        layout: "/admin",
        path: "/forum",
        icon: <Icon as={MdChat} width="20px" height="20px" color="inherit" />,
        component: DiscussionForum,
    },
];

export default routes;
