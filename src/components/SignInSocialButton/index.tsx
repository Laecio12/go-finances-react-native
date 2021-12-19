import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";
import { SvgProps } from "react-native-svg";

import { Container, Title, ImageContainer, } from "./styles";

interface IProps extends RectButtonProps {
  title: string;
  svg: React.FC<SvgProps>

}

export function SignInSocialButton({title, svg: Svg, ...rest}: IProps) {
  return (
    <Container {...rest}>
      <ImageContainer>
        <Svg />
      </ImageContainer>
      <Title>{title}</Title>
    </Container>
  );
}