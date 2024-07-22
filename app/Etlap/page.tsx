import '../../styles/global.css';
import '../../components/LeftNav';
import LeftNav from '../../components/LeftNav';
import Header from '../../components/HeaderEtlap';
import ListItems from '../../components/ListItems';
import SaveButton from '../../components/SaveButton';
const Etlap = () => (
  <div className="nav-wrapper">
        <LeftNav/>
    <div className="page-wrapper-etlap">
      <Header/>
      <ListItems/>
      <SaveButton/>
    </div>
  </div>
  );
  
  export default Etlap;