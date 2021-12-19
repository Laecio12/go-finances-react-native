import React from "react";
import GoogleSvg from '../../assets/google.svg';
import LogoSvg from '../../assets/logo.svg';
import { useAuth } from "../../hooks/auth";
import { SignInSocialButton } from "../../components/SignInSocialButton";
import {
  Container,
  Header,
  TitleWrapper, 
  Title, 
  SignInTitle, 
  Footer, 
  FooterWrapper  
} from "./styles";

export function SignIn() {
  const {signInWithGoogle} = useAuth();
  async function handleSignIn() {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.log(error);
    }
      
    }
  
  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg 
            width={120}
            height={68}
         />
          <Title>
            Controle suas {'\n'} 
            finanças de forma {'\n'}
             muito simples
          </Title>
          <SignInTitle>
            Faça login com sua conta Google
          </SignInTitle>
        </TitleWrapper>
      </Header>
      <Footer>
        <FooterWrapper>
          <SignInSocialButton
          svg={GoogleSvg}
          title="Entrar com Google"
          onPress={handleSignIn}
          />
       </FooterWrapper>

      </Footer>
     
    </Container>
  );
}