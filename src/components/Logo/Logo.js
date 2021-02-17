import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import brain from './brain.svg';

const Logo = () => {
	return(
		<div className='ma4 mt0 center'> 
			<Tilt className='Tilt' options={{ max : 55 }} style={{ height: 250, width: 250 }} >
			 	<div className="Tilt-inner pa3"><img alt='logo' src={brain}/></div>
			</Tilt>

			{/*Icon made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>*/}
		</div>
	);
}
export default Logo;
