import React from 'react';

const Rank = ({isSignedIn}) => {
	if (isSignedIn){
		return(
			<div>
				<div className='white f3'>
					{'Song, your current rank is...'}
				</div>
				<div className='white f1'>
					{'#5'}
				</div>
			</div>
		);
	} else {
		return(
			<div>
					<div className='white f3'>
						{'Sign in to get your rank!'}
					</div>
			</div>
		);
	}

}
export default Rank;