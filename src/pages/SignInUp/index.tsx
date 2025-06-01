import { useState } from 'react';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router';
import Input from '../../components/Input/Input';
import { useUsers } from '../../contexts/users/users';
import { type UserRegister, type UserLogin } from '../../types';

const SignInUp = () => {
	const { login, createUser } = useUsers();
	const [accessMode, setAccessMode] = useState('');
	const [loginData, setLoginData] = useState<UserLogin>({
		email: '',
		password: '',
	});
	const [registerData, setRegisterData] = useState<UserRegister>({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
	});
	const navigate = useNavigate();

	const handleLogin = async () => {
		const user = await login(loginData);
		if (user) {
			return navigate('/');
		}
		return alert('Email ou senha inválidos');
	};

	const handleRegister = async () => {
		const user = await createUser(registerData);
		if (user) {
			return navigate('/');
		}
		return alert('Erro ao cadastrar usuário');
	};

	return (
		<div className='flex flex-col items-center justify-center min-h-[80vh]'>
			{accessMode === '' && (
				<>
					<h1 className='text-2xl font-bold mb-4 text-black'>Boas-vindas</h1>
					<h2 className='text-lg text-gray-500 mb-4 max-w-1/3 text-center'>
						Adotar pode mudar uma vida. Que tal buscar seu novo melhor amigo hoje? Vem com a gente!
					</h2>
					<div className='flex flex-col items-center justify-center'>
						<Button onClick={() => setAccessMode('login')}>Já tenho conta</Button>
						<div className='w-full h-[1px] bg-gray-300 my-4' />
						<Button onClick={() => setAccessMode('register')}>Quero me cadastrar</Button>
					</div>
				</>
			)}
			{accessMode === 'login' && (
				<div className='flex flex-col items-center justify-center md:w-1/3 w-2/3'>
					<h1 className='text-2xl font-bold mb-4 text-[#3772FF]'>Já tem conta? Faça seu login:</h1>
					<Input
						type='email'
						placeholder='Email'
						label='Email'
						value={loginData.email}
						onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
					/>
					<Input
						type='password'
						placeholder='Senha'
						label='Senha'
						value={loginData.password}
						onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
					/>
					<Button onClick={handleLogin}>Entrar</Button>
					<div className='w-full h-[1px] bg-gray-300 my-4' />
					<Button onClick={() => setAccessMode('register')}>Quero me cadastrar</Button>
				</div>
			)}
			{accessMode === 'register' && (
				<div className='flex flex-col items-center justify-center md:w-1/3 w-2/3'>
					<h1 className='text-2xl font-bold mb-4 text-[#3772FF]'>Quero me cadastrar:</h1>
					<Input
						type='text'
						placeholder='Nome'
						label='Nome'
						value={registerData.name}
						onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
					/>
					<Input
						type='email'
						placeholder='Email'
						label='Email'
						value={registerData.email}
						onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
					/>
					<Input
						type='password'
						placeholder='Senha'
						label='Senha'
						value={registerData.password}
						onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
					/>
					<Input
						type='password'
						placeholder='Confirmar senha'
						label='Confirmar senha'
						value={registerData.confirmPassword}
						onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
					/>
					<Button onClick={handleRegister}>Cadastrar</Button>
					<div className='w-full h-[1px] bg-gray-300 my-4' />
					<Button onClick={() => setAccessMode('login')}>Já tenho conta</Button>
				</div>
			)}
		</div>
	);
};

export default SignInUp;
