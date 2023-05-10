import React from 'react';
import './LandingPage.css';

const LandingPage = () => {
	return (
		<>
			<div
				className='landing'
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					// marginTop: '13rem',
					width: '100vw',
					border: '2px solid black',
					height: '92vh',
				}}>
				<h1>Welcome to 24News App</h1>
			</div>
		</>
	);
};

export default LandingPage;
