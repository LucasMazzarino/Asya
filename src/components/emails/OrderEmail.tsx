import { formatPrice } from '../../lib/utils'
import { Product } from '../../payload-type'

import {
  Body,
  Container,
  Column,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
  render,
} from '@react-email/components'

import * as React from 'react'

import { format } from 'date-fns'

interface OrderEmailProps {
  email: string
  date: Date
  userType: string
  orderId: string
  products: Product[]
}

export const OrderEmail = ({
  email,
  date,
  userType,
  orderId,
  products,
}: OrderEmailProps) => {
  const total = userType === 'Wholesale' 
    ? products.reduce((acc, curr) => acc + curr.wholesalePrice * curr.quantity!, 0)
    : products.reduce((acc, curr) => acc + curr.price * curr.quantity!, 0)
  

  const getAbsoluteUrl = (url: string) => {
    if (url.startsWith('http')) {
      return url;
    }
    return `https://${url}`;
  };
   
  return (
    <Html>
      <Head />
      <Preview>Gracias por realizar tu Pedido!</Preview>

      <Body style={main}>
        <Container style={container}>
          <Section>
            <Column>
              <Img
                src='https://asya.uy/favicon.ico'
                width='100'
                height='100'
                alt='Asya'
              />
            </Column>
            <Column align='right' style={tableCell}>
              <Text style={heading}>Pedido</Text>
            </Column>
          </Section>
          <Section style={informationTable}>
            <Row style={informationTableRow}>
              <Column style={informationTableColumn}>
                <Text style={informationTableLabel}>
                  EMAIL
                </Text>
                <Link
                  style={{
                    ...informationTableValue,
                  }}>
                  {email}
                </Link>
              </Column>

              <Column style={informationTableColumn}>
                <Text style={informationTableLabel}>
                  Fecha
                </Text>
                <Text style={informationTableValue}>
                  {format(date, 'dd MMM yyyy')}
                </Text>
              </Column>

              <Column style={informationTableColumn}>
                <Text style={informationTableLabel}>
                  ORDER ID
                </Text>
                <Link
                  style={{
                    ...informationTableValue,
                  }}>
                  {orderId}
                </Link>
              </Column>
              <Column style={informationTableColumn}>
                <Text style={informationTableLabel}>
                  Pago
                </Text>
                <Link
                  style={{
                    ...informationTableValue,
                  }}>
                  pendiente
                </Link>
              </Column>
            </Row>
          </Section>
          <Section style={productTitleTable}>
            <Text style={productsTitle}>Suma del pedido</Text>
          </Section>
          {products.map((product) => {
            const { image } = product.images[0]
            const imageUrl = typeof image === "string" 
            ? image 
            : image.url?.replace('http://localhost:3000/media/', 'https://asya.uy/');

            return (
              <Section key={product.id}>
                <Column style={{ width: '64px' }}>
                  {typeof image !== 'string' &&
                  image.url ? (
                    <Img
                      src={imageUrl}
                      width='64'
                      height='64'
                      alt='Product Image'
                      style={productIcon}
                    />
                  ) : null}
                </Column>
                <Column style={{ paddingLeft: '22px' }}>
                  <Text style={productTitle}>
                    {product.name}
                  </Text>
                  {product.description ? (
                    <Text style={productDescription}>
                      {product.description.length > 50
                        ? product.description?.slice(
                            0,
                            50
                          ) + '...'
                        : product.description}
                    </Text>
                  ) : null}
                </Column>

                <Column
                  style={productPriceWrapper}
                  align='right'>
                  <Text style={productPrice}>
                    {userType === 'Wholesale' ?
                    formatPrice(product.wholesalePrice)
                  : formatPrice(product.price)}
                  </Text>
                  <Text style={productDescription}>
                    cantidades: {product.quantity}
                  </Text>
                </Column>
              </Section>
            )
          })}
          <Hr style={productPriceLine} />
          <Section align='right'>
            <Column style={tableCell} align='right'>
              <Text style={productPriceTotal}>TOTAL</Text>
            </Column>
            <Column
              style={productPriceVerticalLine}></Column>
            <Column style={productPriceLargeWrapper}>
              <Text style={productPriceLarge}>
                {formatPrice(total)}
              </Text>
            </Column>
          </Section>
          <Hr style={productPriceLineBottom} />
          <Text style={footerCopyright}>
            ponte en contacto a nuestro <Link
            href='https://api.whatsapp.com/send?phone=596703656&text=Hola%2C%20realice%20un%20pedido%20en%Asya.'>WhathsApp </Link>
             y envía el comprobante de la transferencia.
          </Text>
          <Text style={footerCopyright}>
            Copyright © 2024 Asya Inc. <br />{' '}
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

export const OrderEmailHtml = (
  props: OrderEmailProps
) =>
  render(<OrderEmail {...props} />, {
    pretty: true,
  })

const main = {
  fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
  backgroundColor: '#ffffff',
}

const resetText = {
  margin: '0',
  padding: '0',
  lineHeight: 1.4,
}

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  width: '660px',
}

const tableCell = { display: 'table-cell' }

const heading = {
  fontSize: '28px',
  fontWeight: '300',
  color: '#888888',
}

const informationTable = {
  borderCollapse: 'collapse' as const,
  borderSpacing: '0px',
  color: 'rgb(51,51,51)',
  backgroundColor: 'rgb(250,250,250)',
  borderRadius: '3px',
  fontSize: '12px',
  marginTop: '12px',
}

const informationTableRow = {
  height: '46px',
}

const informationTableColumn = {
  paddingLeft: '20px',
  borderStyle: 'solid',
  borderColor: 'white',
  borderWidth: '0px 1px 1px 0px',
  height: '44px',
}

const informationTableLabel = {
  ...resetText,
  color: 'rgb(102,102,102)',
  fontSize: '10px',
}

const informationTableValue = {
  fontSize: '12px',
  margin: '0',
  padding: '0 4px 0 0',
  lineHeight: 1.4,
}

const productTitleTable = {
  ...informationTable,
  margin: '30px 0 15px 0',
  height: '24px',
}

const productsTitle = {
  background: '#fafafa',
  paddingLeft: '10px',
  fontSize: '14px',
  fontWeight: '500',
  margin: '0',
}

const productIcon = {
  margin: '0 0 0 20px',
  borderRadius: '14px',
  border: '1px solid rgba(128,128,128,0.2)',
}

const productTitle = {
  fontSize: '12px',
  fontWeight: '600',
  ...resetText,
}

const productDescription = {
  fontSize: '12px',
  color: 'rgb(102,102,102)',
  ...resetText,
}

const productLink = {
  fontSize: '12px',
  color: 'rgb(0,112,201)',
  textDecoration: 'none',
}

const productPriceTotal = {
  margin: '0',
  color: 'rgb(102,102,102)',
  fontSize: '10px',
  fontWeight: '600',
  padding: '0px 30px 0px 0px',
  textAlign: 'right' as const,
}

const productPrice = {
  fontSize: '12px',
  fontWeight: '600',
  margin: '0',
}

const productPriceLarge = {
  margin: '0px 20px 0px 0px',
  fontSize: '16px',
  fontWeight: '600',
  whiteSpace: 'nowrap' as const,
  textAlign: 'right' as const,
}

const productPriceWrapper = {
  display: 'table-cell',
  padding: '0px 20px 0px 0px',
  width: '100px',
  verticalAlign: 'top',
}

const productPriceLine = { margin: '30px 0 0 0' }

const productPriceVerticalLine = {
  height: '48px',
  borderLeft: '1px solid',
  borderColor: 'rgb(238,238,238)',
}

const productPriceLargeWrapper = {
  display: 'table-cell',
  width: '90px',
}

const productPriceLineBottom = { margin: '0 0 20px 0' }

const footerLinksWrapper = {
  margin: '8px 0 0 0',
  textAlign: 'center' as const,
  fontSize: '12px',
  color: 'rgb(102,102,102)',
}

const footerCopyright = {
  margin: '25px 0 0 0',
  textAlign: 'center' as const,
  fontSize: '12px',
  color: 'rgb(102,102,102)',
}