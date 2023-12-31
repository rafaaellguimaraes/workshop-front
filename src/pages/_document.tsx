import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head>
			<link
        href="https://fonts.googleapis.com/css2?family=Maven+Pro:wght@400;500;700&display=swap"
        rel="stylesheet"
      />
			<link 
				href="https://fonts.googleapis.com/css2?family=Marcellus&family=Poppins:wght@200&display=swap" 
				rel="stylesheet" 
			/>
			</Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
