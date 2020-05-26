import App from 'next/app';
import { ThemeProvider } from 'styled-components';

import Layout from '../components/Layout';
import { withApollo } from '../graphql/withApollo';
import * as S from '../components/styles';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <ThemeProvider theme={S.theme}>
        <S.GlobalStyle />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    );
  }
}

export default withApollo({ ssr: true })(MyApp);
