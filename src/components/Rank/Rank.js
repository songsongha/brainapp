import React from 'react';

const Rank = ({user, isSignedIn}) => {
	if (isSignedIn){
		{console.log(user)};
		return(
			<div>
				<div className='white f3'>
					{user.name}, your current entry count is...
				</div>
				<div className='white f1'>
					{user.entries}
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