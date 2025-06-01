import { useEffect, useState } from 'react';
import { useUsers } from '../../contexts/users/users';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import type { User } from '../../types';

const Profile = () => {
	const { getUser, updateUser } = useUsers();
	const [editProfile, setEditProfile] = useState<User>({
		id: '',
		name: '',
		email: '',
		phone: '',
		city: '',
		about: '',
	});

	useEffect(() => {
		const user = getUser();
		if (!user) return;
		setEditProfile({
			...user,
			id: user.id,
			name: user.name,
			email: user.email,
			phone: user.phone,
			city: user.city,
			about: user.about,
		});
	}, [getUser]);

	const handleUpdateUser = async (user: User) => {
		const updatedUser = await updateUser(user);
		if (updatedUser) {
			return alert('Perfil atualizado com sucesso');
		}
		return alert('Erro ao atualizar perfil');
	};
	return (
		<div className='flex flex-col mb-20 min-h-screen w-1/3 mx-auto'>
			<h1 className='text-2xl font-bold text-[#3772FF] mt-4 text-center'>
				Esse é o perfil que aparece para responsáveis ou ONGs que recebem sua mensagem.
			</h1>
			<div className='flex flex-col items-center justify-center gap-4 mt-10'>
				<Input
					label='Nome'
					value={editProfile.name}
					onChange={(e) => setEditProfile({ ...editProfile, name: e.target.value })}
				/>
				<Input
					label='Email'
					value={editProfile.email}
					onChange={(e) => setEditProfile({ ...editProfile, email: e.target.value })}
				/>
				<Input
					label='Telefone'
					value={editProfile.phone ?? ''}
					onChange={(e) => setEditProfile({ ...editProfile, phone: e.target.value })}
				/>
				<Input
					label='Cidade'
					value={editProfile.city ?? ''}
					onChange={(e) => setEditProfile({ ...editProfile, city: e.target.value })}
				/>
				<Input
					label='Sobre'
					value={editProfile.about ?? ''}
					onChange={(e) => setEditProfile({ ...editProfile, about: e.target.value })}
				/>
				<Button size='sm' onClick={() => handleUpdateUser(editProfile)}>
					Editar Perfil
				</Button>
			</div>
		</div>
	);
};

export default Profile;
