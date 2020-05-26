import Signup from '../components/Signup';
import Signin from '../components/Signin';
import RequestReset from '../components/RequestReset';

import * as S from '../components/styles';

const SignupPage = () => (
  <S.Columns>
    <Signup />
    <Signin />
    <RequestReset />
  </S.Columns>
);

export default SignupPage;
