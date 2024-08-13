import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
  render,
} from '@react-email/components'

import * as React from "react"

interface EmailTemplateProps {
  actionLabel: string
  buttonText: string
  href: string
}

export const EmailTemplate = ({
  actionLabel,
  buttonText,
  href,
}: EmailTemplateProps) => {
  return (
    <Html>
      <Head />
      <Preview>
        Asya  e-commerce
      </Preview>
      <Body style={main}>
        <Container style={container}>
        <Section style={logoContainer}>
            <Img
              src='https://asya.uy/favicon.ico'
              width='300'
              height='300'
              alt='Asya'
              style={logo}
            />
          </Section>
          <Text style={paragraph}>Hola!</Text>
          <Text style={paragraph}>
           Bienvenidos a Asya, gracias por registrate en nuestra plataforma.
           Verifica tu cuenta para comenzar comenzar a comprar!
           <br />
            {actionLabel}.
          </Text>
          <Section style={btnContainer}>
            <Button style={button} href={href}>
              {buttonText}
            </Button>
          </Section>
          <Text style={paragraph}>
            Te deseamos lo mejor.
            <br />
            El Equipo de Asya
          </Text>
          <Hr style={hr} />
          <Text style={footer}>
            Si tu no requeriste este email puedes ignorarlo.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

export const PrimaryActionEmailHtml = (
  props: EmailTemplateProps
) => render(<EmailTemplate {...props} />, { pretty: true })

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
}

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
}

const logoContainer = {
  width: '100%',
  textAlign: 'center' as const,
}

const logo = {
  margin: '0 auto',
  display: 'block' as const,
}

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
}

const btnContainer = {
  textAlign: 'center' as const,
}

const button = {
  padding: '12px 12px',
  backgroundColor: '#2563eb',
  borderRadius: '3px',
  color: '#fff',
  fontSize: '16px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
}

const hr = {
  borderColor: '#cccccc',
  margin: '20px 0',
}

const footer = {
  color: '#8898aa',
  fontSize: '12px',
}