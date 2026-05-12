import { useEffect } from 'react';
import logo from '../images/newsify_header.png';
import './intro.css';
 
function Intro({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 3000); 
    return () => clearTimeout(timer);
  }, [onFinish]);
 
  return (
    <div className="intro">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logoo" />
        <h1 className="title">Newsify</h1>
      </div>
    </div>
  );
}
 
export default Intro;