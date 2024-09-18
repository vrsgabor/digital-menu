'use client'
import '../../styles/global.css';
import LeftNav from '../../components/LeftNav';
import HeaderQrcode from '../../components/HeaderQrcode';
import SaveButton from '@/components/SaveButton';
import QrCodeComponent from '@/components/QrCodeComponent';



const Qrcode = () => (
    <div className="nav-wrapper">
    <LeftNav/>
    <div className="page-wrapper-etterem">
            <HeaderQrcode/>
            <div className='account-content-wrapper'>
            </div>
            <QrCodeComponent />    
            <SaveButton />
    </div>
  </div>
  );
  
  export default Qrcode;