import logo from '../../assets/adopet.png';
import user from '../../assets/user.svg';
import home from '../../assets/home.svg';
import { useLocation, useNavigate } from 'react-router';

const Header = () => {
	const navigate = useNavigate();
	const isSignInUp = useLocation().pathname === '/signinup';
	return (
		<div className='flex justify-between items-center p-4'>
			<div className='flex items-center gap-4'>
				<img
					className='w-[200px] cursor-pointer'
					src={logo}
					alt='logo'
					onClick={() => !isSignInUp && navigate('/')}
				/>
				{!isSignInUp && (
					<img
						className='w-[30px] cursor-pointer'
						src={home}
						alt='home icon'
						onClick={() => navigate('/')}
					/>
				)}
			</div>
			<div className='flex items-center gap-4'>
				{!isSignInUp && (
					<img
						className='w-[50px] h-[50px] cursor-pointer'
						src={user}
						alt='user icon'
						onClick={() => navigate('/profile')}
					/>
				)}
			</div>
		</div>
	);
};

export default Header;
