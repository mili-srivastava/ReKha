interface ButtonProps {
  children: React.ReactNode;
  customClass?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;

}

const Button = (props: ButtonProps) => {
  return (
    <button
      className={`border-primary border-2 px-5 py-1.5 text-primary font-bold rounded-lg 
                 ${props.customClass}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
