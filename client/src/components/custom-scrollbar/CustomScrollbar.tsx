import React, { Context } from "react";
import { ScrollerProps } from "react-virtuoso";
import "./styles.scss";

export const CustomScrollbar = React.forwardRef<
  HTMLDivElement,
  ScrollerProps & { context?: Context<unknown> }
>(({ style, ...props }, ref) => {
  return (
    <div
      className={"custom-scrollbar"}
      style={{ ...style, marginRight: -10 }}
      ref={ref}
      {...props}
    />
  );
});
