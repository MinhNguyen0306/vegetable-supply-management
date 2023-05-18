import React from 'react';

interface IButton {
	rounded?: boolean;
	outlined?: boolean;
	children?: string | React.ReactNode;
	onClick?: React.MouseEventHandler<HTMLButtonElement> | any;
	type?: 'button' | 'reset' | 'submit' | undefined;
}

const Button: React.FC<IButton> = ({ rounded, outlined, children, onClick, type }) => {

	return (
		<button 
			type={type} 
				className={`w-auto px-10 py-2 border border-transparent bg-mainColor ${rounded ? "rounded-3xl" : ""} 
				text-white ${outlined ? "!text-mainColor bg-transparent border-2 !border-mainColor" : ""} 
				hover:opacity-90 hover:border-secondColor uppercase`} 
				onClick={onClick ? onClick : null}
			>
			{children}
		</button>
	)
}

export default Button
