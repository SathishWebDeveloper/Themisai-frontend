/* eslint-disable @typescript-eslint/no-explicit-any */

const Header = ({ headerValue, isDrawerOpen }: any) => {
  return (
    <div
      style={{
        fontFamily: "Manrope",
        fontSize: "24px",
        fontWeight: "700",
        lineHeight: "31.2px",
        marginLeft: isDrawerOpen ? "40px" : "10px", 
      }}
    >
      {headerValue}
    </div>
  );
};
export default Header;
