'use client'
import '../../styles/global.css';
import LeftNav from '../../components/LeftNav';
import HeaderAccount from '../../components/HeaderAccount';
import AccountContent from '../../components/AccountContent';
import SaveButton from '@/components/SaveButton';

const Account = () => (
  <div className="nav-wrapper">
    <LeftNav/>
    <div className="page-wrapper-etterem">
            <HeaderAccount/>
            <div className='account-content-wrapper'>
            <AccountContent />
            </div>
    </div>
  </div>
  );
  
  export default Account;