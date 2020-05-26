import Reset from '../components/Reset';
import { useRouter } from 'next/router';

const ResetPage = () => {
  const router = useRouter();
  const { resetToken } = router.query;

  return (
    <div>
      <p>Reset Your Password {resetToken}</p>
      <Reset resetToken={resetToken} />
    </div>
  );
};

export default ResetPage;
