import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router';

const Contact = () => {
	const navigate = useNavigate();
	const handleSendMessage = () => {
		alert('Mensagem enviada com sucesso');
		setTimeout(() => {
			navigate('/');
		}, 1500);
	};
	return (
		<div className='flex flex-col mb-20 min-h-screen w-1/3 mx-auto'>
			<h1 className='text-2xl font-bold text-[#3772FF] mt-4 text-center'>
				Envie uma mensagem para a pessoa ou instituição que está cuidando do animal:
			</h1>
			<div className='flex flex-col items-center justify-center gap-4 mt-10'>
				<Input label='Nome' placeholder='Insira seu nome' value='' onChange={() => {}} />
				<Input label='Telefone' placeholder='Insira seu telefone' value='' onChange={() => {}} />
				<Input
					label='Nome do animal'
					placeholder='Insira o nome do animal'
					value=''
					onChange={() => {}}
				/>
				<Input
					label='Mensagem'
					placeholder='Insira uma mensagem para o responsável'
					value=''
					onChange={() => {}}
				/>
				<Button onClick={handleSendMessage}>Enviar mensagem</Button>
			</div>
		</div>
	);
};

export default Contact;
