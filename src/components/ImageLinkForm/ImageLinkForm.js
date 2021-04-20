import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onButtonSubmit, clearInput}) => {
	return(
		<div>
			<p className='f3'>
				{'This Magic Brain will detect faces in your pictures. Give it a try!'}
			</p>
			<div className='center'>
				<div className='form pa4 br3 shadow-5'>
					<input className='f4 pa2 w-60' id='inputBox' type='text' onChange={onInputChange} />
					<button 
						className='w-20 grow f4 link ph3 pv2 dib white bg-light-purple'
						onClick={onButtonSubmit}
					>Detect</button>
					<button 
						className='w-20 grow f4 link ph3 pv2 dib white bg-light-pink'
						onClick={clearInput}
					>Clear</button>
				</div>
			</div>

		</div>


	);
}
export default ImageLinkForm;