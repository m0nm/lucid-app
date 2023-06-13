import "allotment/dist/style.css";

import { useEffect, useState } from "react";
import { Allotment } from "allotment";
import { Link, Outlet, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import cookies from "js-cookie";

import {
  Alert,
  CloseButton,
  Text,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";

import { useEditorStore } from "@/store";
import { jwt } from "@/utils";
import { AppTour, MotionBox, PageTransition } from "..";
import { Sidebar } from "./sidebar/Sidebar";
import { JOYRIDE_CONTAINER } from "@/constants/app-tour";

const SIDEBAR_SIZE = { max: 200, min: 45 };
const GUEST_ALERT_COOKIE = "show-guest-alert";

export const AppLayout = () => {
  const { isFocusMode } = useEditorStore();

  // to show an alert to guest users to login
  if (typeof cookies.get(GUEST_ALERT_COOKIE) == "undefined") {
    cookies.set(GUEST_ALERT_COOKIE, true.toString());
  }

  // tell mobile users this app is not suitable
  const [isTabletOrMobile] = useMediaQuery("(max-width: 1224px)");
  useEffect(() => {
    if (isTabletOrMobile) {
      toast("Note: the app is not suitable for mobile", { id: "mobile-toast" });
    }
  }, [isTabletOrMobile]);

  const navigate = useNavigate();
  useEffect(() => navigate("notes", { replace: true }), []);

  // decrease opacity of sidebar titles as it's pane minimizes
  const [opacity, setOpacity] = useState(1);

  const onPaneChange = (e: number[]) => {
    const normalized =
      (e[0] - SIDEBAR_SIZE.min) / (SIDEBAR_SIZE.max - SIDEBAR_SIZE.min);
    setOpacity(normalized);
  };

  return (
    <>
      {cookies.get(GUEST_ALERT_COOKIE) === "true" && !jwt.getToken() && (
        <GuestUserAlert />
      )}

      <MotionBox w={"100%"} h={"100vh"}>
        <MotionBox id={JOYRIDE_CONTAINER}>
          <AppTour />
        </MotionBox>

        <Allotment onChange={onPaneChange}>
          <Allotment.Pane
            visible={!isFocusMode}
            minSize={SIDEBAR_SIZE.min}
            maxSize={SIDEBAR_SIZE.max}
          >
            <Sidebar opacity={opacity} />
          </Allotment.Pane>

          <Allotment.Pane>
            <Outlet />
          </Allotment.Pane>
        </Allotment>

        <PageTransition />
      </MotionBox>
    </>
  );
};

function GuestUserAlert() {
  const { isOpen, onClose } = useDisclosure({
    defaultIsOpen: Boolean(cookies.get(GUEST_ALERT_COOKIE)) || true,
  });

  const onDismiss = () => {
    onClose();
    cookies.set(GUEST_ALERT_COOKIE, false.toString());
  };

  return isOpen ? (
    <Alert h={10} variant={"left-accent"} status={"warning"}>
      <Text fontSize="sm" fontWeight={500} justifyContent={"center"}>
        Your notes will be lost once you close the browser,{" "}
        <Link to="/login">
          <Text as="span" color="blue.500">
            Login
          </Text>
        </Link>{" "}
        to save it to database
      </Text>

      <CloseButton
        colorScheme={"yellow"}
        variant={"unstyled"}
        ml={"auto"}
        p={0}
        onClick={onDismiss}
      />
    </Alert>
  ) : (
    <></>
  );
}
