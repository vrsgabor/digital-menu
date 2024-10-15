import '../../styles/global.css';
import LeftNav from '../../components/LeftNav';
import HeaderElofizetes from '../../components/HeaderElofizetes';
import Subscriptions from '../../components/Subscriptions';


const Etlap = () => (
  <div className="whole-page-wrapper">
      <div className="nav-wrapper">
        <LeftNav/>
      </div>
      <div className="page-wrapper-etlap">
        <HeaderElofizetes/>
        <Subscriptions/>
      </div>
  </div>
  );
  
  export default Etlap;
