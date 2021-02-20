import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({imageURL, box}) => {
	console.log(box[0].topRow);
	return(
		<div className='center ma'>
			<div className = 'absolute mt2'>
				<img id ='inputimage' alt='' src={imageURL} width='500px' height='auto'/>
				<div className='bounding-box' style={{top: box[0].topRow, right:box[0].rightCol[0], bottom: box[0].bottomRow, left: box[0].leftCol}}></div>
			</div>
		</div>
	);
}
export default FaceRecognition;