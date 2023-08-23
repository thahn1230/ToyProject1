import Image from "next/image";
import { HeaderLeftWrapper } from "./HeaderLeft.styles";

const HeaderLeft = () => {
  const handleDivClick = () => {
    window.location.href = "http://localhost:3000/"; // 해당 링크로 이동
  };

  return (
    <HeaderLeftWrapper>
      <Image width={50} height={50} src="/skku_s.png" alt="logo"></Image>
      <a
        style={{
          fontFamily: "Roboto, sans-serif",
          fontSize: "1.6rem",
          fontWeight: "800",
          color: "black",
          margin: "30px",
          textDecoration: "none", // 링크에 밑줄 제거
          cursor: "pointer", // 클릭 가능한 커서 스타일 추가
        }}
        onClick={handleDivClick} // 클릭 시 이벤트 핸들러 호출
      >
        율맛추
      </a>
    </HeaderLeftWrapper>
  );
};

export default HeaderLeft;
