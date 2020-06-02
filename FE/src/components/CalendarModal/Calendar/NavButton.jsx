/** @jsx jsx */
import { jsx } from "@emotion/core";

export default function NavButton({ children, onClick }) {
  return (
    <button
      props={children === "Previous" ? "<" : ">"}
      type="button"
      onClick={onClick}
      css={{
        border: 0,
        outline: 0,
        background: "transparent",
        padding: "8px",
        fontSize: "23px",
        color: "#A4A4A4",
        marginTop: "22px",
      }}
    >
      {children === "Previous" ? "<" : ">"}
    </button>
  );
}
