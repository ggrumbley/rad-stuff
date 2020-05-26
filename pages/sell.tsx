import CreateItem from '../components/CreateItem';
import AuthGuard from '../components/AuthGuard';

const Sell = () => (
  <div>
    <AuthGuard>
      <CreateItem />
    </AuthGuard>
  </div>
);

export default Sell;
