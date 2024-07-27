'use client'
import '../../styles/global.css';
import LeftNav from '../../components/LeftNav';
import HeaderEtterem from '../../components/HeaderEtterem';
import Dashboard from '../../components/Dashboard';

const Etterem = () => (
  <div className="nav-wrapper">
        <LeftNav/>
        <div className="page-wrapper-etterem">
            <HeaderEtterem/>
            <Dashboard/>
    </div>
  </div>
  );
  
  export default Etterem;