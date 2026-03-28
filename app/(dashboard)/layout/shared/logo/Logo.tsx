import Link from "next/link";
import { styled } from "@mui/material";
import Image from "next/image";

const LinkStyled = styled(Link)(() => ({
  height: "50px",
  width: "180px",
  overflow: "hidden",
  display: "block",
  fontWeight:"bold",
  textAlign:"center",
  fontSize:"20px",
  paddingTop:"15px",
  paddingLeft:"10px",
  minWidth:"100%"
}));

const Logo = () => {
  return (
    <LinkStyled href="/">
      {/* <Image src="/images/logos/logo-dark.svg" alt="logo" height={40} width={105} priority /> */}
      Codeswear Admin
    </LinkStyled>
  );
};

export default Logo;
