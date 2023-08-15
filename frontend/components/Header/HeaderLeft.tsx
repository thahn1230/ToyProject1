import Image from "next/image";
import { HeaderLeftWrapper } from "./HeaderLeft.styles";

const HeaderLeft = () => {
  return (
    <HeaderLeftWrapper>
      <Image width={50} height={50} src="/skku_s.png" alt="logo"></Image>
      <div
        style={{
          fontFamily: "Roboto, sans-serif",
          fontSize: "1.6rem",
          fontWeight: "800",
          color: "white",
          margin: "30px",
        }}
      >
        율맛추
      </div>
    </HeaderLeftWrapper>
  );
};

export default HeaderLeft;
