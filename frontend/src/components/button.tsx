interface ButtonProps{
    buttonType: "submit" | "reset" | "button";
    buttonName: string
}

export const Button =({buttonType, buttonName}: ButtonProps)=>{
    return <button className="cursor-pointer bg-sky-500 text-white p-2 rounded-md w-28" type={buttonType}>{buttonName}</button>
}