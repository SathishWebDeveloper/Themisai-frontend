import { useEffect, useState } from "react";

export const AISummaryReport = ({ time, element, index }: any) => {
  const [display, setDisplay] = useState("none");
  const [border, setBorder] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setDisplay("block");
    }, time);
    setTimeout(() => {
      setBorder(false);
    }, time + 10);
  }, []);
  return (
    <>
      <span
        key={index}
        style={{
          display: `${display}`,
          paddingLeft: `${element === " " ? "4px" : "0px"}`,
          paddingRight: `${element === " " ? "4px" : "0px"}`,
          borderRight: `${
            display === "block" && border ? "3px solid #000" : ""
          }`,
        }}
      >{`${element}`}</span>
    </>
  );
};  
