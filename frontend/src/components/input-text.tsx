interface InputProps{
    inputType: "text" | "password",
    inputName: string,
    inputPlaceholder: string
}

export const Input = ({inputType, inputName, inputPlaceholder}: InputProps)=>{
    return(
        <input className="border-b border-gray-600 p-2 focus:outline-none focus:border-b-2 w-xs" type={inputType} name={inputName} placeholder={inputPlaceholder}/>
    )
}