import React from 'react';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router';

const NotFound = () => {
	const navigate = useNavigate();
	return (
		<div className='flex flex-col items-center justify-center'>
			<h1 className='text-4xl font-bold mt-10'>Oops! Página não encontrada</h1>
			<p className='text-gray-500 my-4 text-center'>
				A página que você está procurando não existe.
			</p>
			<Button onClick={() => navigate('/')}>Ir para a página inicial</Button>
		</div>
	);
};

export default NotFound;
