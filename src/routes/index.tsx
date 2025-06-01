import { createBrowserRouter } from 'react-router';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import NotFound from '../pages/NotFound';
import Profile from '../pages/Profile';
import Home from '../pages/Home';
import Contact from '../pages/Contact';
import SignInUp from '../pages/SignInUp';

const Wrapper = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className='flex flex-col min-h-screen bg-white'>
			<Header />
			{children}
			<Footer />
		</div>
	);
};

const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<Wrapper>
				<Home />
			</Wrapper>
		),
	},
	{
		path: '/signinup',
		element: (
			<Wrapper>
				<SignInUp />
			</Wrapper>
		),
	},
	{
		path: '/contact',
		element: (
			<Wrapper>
				<Contact />
			</Wrapper>
		),
	},
	{
		path: '/profile',
		element: (
			<Wrapper>
				<Profile />
			</Wrapper>
		),
	},
	{
		path: '*',
		element: (
			<Wrapper>
				<NotFound />
			</Wrapper>
		),
	},
]);

export default router;
