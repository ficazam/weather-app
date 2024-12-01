interface iButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

export const Button = (props: iButtonProps) => (
  <button
    className={`w-[50%] bg-transparent py-2 text-lg font-semibold text-white border-2 border-white 
        ${
          props.disabled
            ? "cursor-not-allowed"
            : "hover:bg-blue-700"
        }
        transition-all duration-300`}
    {...props}
  >
    {props.label}
  </button>
);
