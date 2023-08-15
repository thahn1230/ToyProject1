import Image from "next/image";
import { HeaderLeftWrapper } from "./HeaderLeft.styles";
import { HeaderRightWrapper } from "./HeaderRight.styles";
import { Route } from "react-router-dom";

const HeaderRight = () => {
  return (
    <HeaderRightWrapper>
      <Image src="/ProfileImage.png" width={50} height={50} alt="profile" />
    </HeaderRightWrapper>
  );
};

export default HeaderRight;
