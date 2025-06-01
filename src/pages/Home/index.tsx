import { useEffect } from 'react';
import { useUsers } from '../../contexts/users/users';
import { useNavigate } from 'react-router';
import { usePets } from '../../contexts/pets/pets';
import Card from '../../components/Card/Card';

const Home = () => {
	const navigate = useNavigate();
	const { isAuthenticated } = useUsers();
	const { pets } = usePets();

	useEffect(() => {
		if (!isAuthenticated()) {
			navigate('/signinup');
		}
	}, [isAuthenticated, navigate]);

	return (
		<div className='flex flex-col items-center justify-center mb-20 min-h-screen'>
			<h1 className='text-2xl font-bold text-[#3772FF] mt-4 text-center'>
				Olá! Veja os amigos disponíveis para adoção!
			</h1>
			{pets.length > 0 ? (
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
					{pets.map((pet) => (
						<Card key={pet.id} pet={pet} />
					))}
				</div>
			) : (
				<div className='text-center text-lg text-[#737380]'>Não há pets cadastrados</div>
			)}
		</div>
	);
};

export default Home;
