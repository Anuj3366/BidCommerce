const { Html, Head, Main, NextScript } = require('next/document');

module.exports = function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
