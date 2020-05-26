import UpdateItem from '../components/UpdateItem';
import { useRouter } from 'next/router';

const Update = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <UpdateItem id={id} />
    </div>
  );
};

export default Update;
