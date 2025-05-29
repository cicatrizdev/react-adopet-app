import React from 'react';

const Button = ({ children, onClick, size = 'lg' }) => {
	const sizes = {
		sm: 'w-[174px] h-[40px]',
		lg: 'w-[362px] h-[48px]',
	};

	return (
		<button
			onClick={onClick}
			className={`bg-[#FC7071] hover:bg-[#FF9D9E] text-white font-bold text-lg p-2 rounded-md ${sizes[size]}`}
		>
			{children}
		</button>
	);
};

export default Button;
