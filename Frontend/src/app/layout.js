import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'BidCommerce',
  description: 'BidCommerce is an in-development e-commerce platform, blending online shopping and auction features. It offers a seamless user experience, modern technologies, a bidding system, and public auction chats.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
