import '../../styles/global.css';
import '../../components/LeftNav';
import LeftNav from '../../components/LeftNav';
import Header from '../../components/HeaderEtlap';
import ListItems from '../../components/ListItems';
import SaveButton from '../../components/SaveButton';

const Etlap = () => (
  <div className="whole-page-wrapper">
      <div className="nav-wrapper">
        <LeftNav/>
      </div>
      <div className="page-wrapper-etlap">
        <Header/>
        <ListItems/>
        <SaveButton/>
      </div>
  </div>
  );
  
  export default Etlap;
