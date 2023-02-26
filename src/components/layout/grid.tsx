import { CSSProperties } from "react";

export function Grid({
  children,
  direction = "row",
  alignItems,
  justifyContent,
  style,
  ...props
}: {
  direction?: "column" | "row";
  alignItems?: CSSProperties["alignItems"];
  justifyContent?: CSSProperties["justifyContent"];
} & React.ComponentPropsWithRef<"div">) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: direction,
        alignItems,
        justifyContent,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}
