import { Link } from 'react-router';
import type { Pet } from '../../types';

const Card = ({ pet }: { pet: Pet }) => {
	return (
		<div className='bg-[#F6F6F6] rounded-lg shadow-md p-6 w-full flex flex-col items-center justify-center'>
			<img src={pet.image} alt={pet.name} className='w-40 h-40 object-cover rounded-full' />
			<h2 className='text-2xl font-bold text-[#3772FF] mt-4'>{pet.name}</h2>
			<p className='text-lg text-[#737380] mt-2 text-center'>{pet.description}</p>
			<p className='text-lg text-[#737380] my-2 text-center'>{pet.location}</p>
			<Link to='/contact'>
				<p className='text-lg text-[#3772FF] underline'>Falar com responsável</p>
			</Link>
		</div>
	);
};

export default Card;
