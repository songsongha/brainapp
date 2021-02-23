import React from 'react';

const Navigation = ({changeSignIn, onRouteChange, isSignedIn, route}) => {
	console.log(isSignedIn)
	if (isSignedIn && route ==='home'){
		return(
			<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
				<p onClick={() => changeSignIn(isSignedIn)} className='f3 link dim black underline pa3 pointer'>Sign Out</p>
			</nav>
		);
	} else if (route === 'signin') {
		return(
			<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
				<p onClick={() => onRouteChange('home')} className='f3 link dim black underline pa3 pointer'>Main Page</p>
			</nav>
			);
	}else if (route === 'register'){
		return(
			<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
				<p onClick={() => onRouteChange('signin')} className='f3 link dim black underline pa3 pointer'>Sign In</p>
				<p onClick={() => onRouteChange('home')} className='f3 link dim black underline pa3 pointer'>Main Page</p>
			</nav>
		);
	} else {
		return(
			<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
				<p onClick={() => onRouteChange('signin')} className='f3 link dim black underline pa3 pointer'>Sign In</p>
				<p onClick={() => onRouteChange('register')} className='f3 link dim black underline pa3 pointer'>Register</p>
			</nav>
		);
	}
}
export default Navigation;
