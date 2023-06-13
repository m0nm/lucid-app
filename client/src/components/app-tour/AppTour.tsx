import { useEffect, useMemo, useState } from "react";
import { useIsPresent } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import { useColorMode } from "@chakra-ui/react";
import { useShouldShowTour } from "@/hooks";

import Joyride, { CallBackProps, EVENTS, ACTIONS, Styles } from "react-joyride";
import { JOYRIDE_STEPS } from "@/constants/app-tour";

export const AppTour = () => {
  const isPresent = useIsPresent();
  const { colorMode } = useColorMode();
  const [searchParams] = useSearchParams();

  const shouldShow = useShouldShowTour();

  const [state, setState] = useState({
    run: false,
    steps: JOYRIDE_STEPS,
    stepIndex: 0,
  });

  const styles: Styles = useMemo(
    () => ({
      options: {
        arrowColor: colorMode === "light" ? "#fff" : "#2f3846",
        backgroundColor: colorMode === "light" ? "#fff" : "#2f3846",
      },

      tooltipTitle: {
        fontSize: 20,
        fontWeight: 700,
        margin: "0 0 10px 0",
        color: colorMode === "light" ? "#111" : "#fff",
        marginTop: 12,
      },

      tooltipContent: {
        padding: "10px 10px",
        marginTop: -6,
        color: colorMode === "light" ? "#333" : "#999",
        lineHeight: 1.5,
      },

      buttonNext: {
        display: state.stepIndex === 1 ? "none" : "inline-block",
        backgroundColor: colorMode === "light" ? "#E53E3E" : "#3182CE",
        color: "#fff",
        fontWeight: 600,
      },

      buttonSkip: {
        border: "1px solid",
        borderColor: colorMode === "light" ? "#111" : "#fff",
        color: colorMode === "light" ? "#111" : "#fff",
      },
    }),
    [colorMode, state.stepIndex]
  );

  useEffect(() => {
    if (shouldShow && isPresent) {
      setTimeout(() => setState((p) => ({ ...p, run: true })), 1300);
    }
  }, [isPresent, shouldShow]);

  const handleCallback = (data: CallBackProps) => {
    const { action, index, type } = data;

    if (type === EVENTS.STEP_AFTER) {
      // Update state to advance the tour
      setState((p) => ({
        ...p,
        stepIndex: index + (action === ACTIONS.PREV ? -1 : 1),
      }));
    }
  };

  useEffect(() => {
    if (searchParams.has("noteId") && state.stepIndex === 1) {
      setState((p) => ({ ...p, stepIndex: 2 }));
    }
  }, [searchParams]);

  return (
    <Joyride
      continuous
      disableCloseOnEsc
      disableOverlayClose
      disableScrollParentFix
      disableScrolling
      hideBackButton
      hideCloseButton
      showSkipButton
      spotlightClicks
      spotlightPadding={0}
      steps={state.steps}
      run={state.run}
      stepIndex={state.stepIndex}
      locale={{ last: "Finish" }}
      styles={styles}
      callback={handleCallback}
    />
  );
};
