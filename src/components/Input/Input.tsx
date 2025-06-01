import React from 'react';

interface InputProps {
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	label: string;
	type?: string;
	placeholder?: string;
}

const Input = ({ type, placeholder, value, onChange, label }: InputProps) => {
	return (
		<div className='flex flex-col justify-center items-center mb-4 w-full'>
			<label className='text-lg text-gray-500'>{label}</label>
			<input
				type={type}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				className='border border-gray-300 rounded-md p-2 text-black w-full text-lg'
			/>
		</div>
	);
};

export default Input;
