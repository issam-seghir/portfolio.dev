import { Column, Hr, Img, Link, Row, Section, Text } from '@react-email/components'

function Footer() {
  return (
    <>
      <Hr className='mt-6 mb-3' />
      <Section>
        <Row className='mt-4' align='left' width='auto'>
          <Column className='pr-6 align-middle'>
            <Link href='https://x.com/issam_seghirr' className='text-xl text-black'>
              <Img src='/images/email/x.png' alt='X' width={22} height={22} />
            </Link>
          </Column>
          <Column className='align-middle'>
            <Link href='https://github.com/issam-seghir/portfolio.dev' className='text-xl text-black'>
              <Img src='/images/email/github.png' alt='GitHub' width={22} height={22} />
            </Link>
          </Column>
        </Row>
      </Section>
      <Text className='mx-0 mt-6 mb-0 p-0 text-xs font-normal text-gray-500'>
        © {new Date().getFullYear()} Issam Seghir. All rights reserved.
      </Text>
    </>
  )
}

export default Footer
