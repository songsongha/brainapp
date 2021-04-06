import React from 'react';

const Rank = ({user, isSignedIn}) => {
	if (isSignedIn){
		{console.log(user)};
		return(
			<div>
				<div className='white f3'>
					{user.name}, your current picture count is...
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
						{"Sign in to track the number of pictures you've tried!"}
					</div>
			</div>
		);
	}

}
export default Rank;