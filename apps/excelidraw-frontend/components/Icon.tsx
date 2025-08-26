import  { ReactNode } from 'react';

export function IconButton({
    icon,onClick,activated
}:{
    icon: ReactNode,
    onClick: () => void
    activated: boolean
}
){
    return <div className={`pointer rounded-full bg-gray-200 p-2 hover:bg-gray-300 transition-colors
  cursor-pointer border border-gray-300 ${activated ? 'bg-blue-500 text-white' : 'text-gray-700'}`}

        onClick={onClick}>
        {icon}
    </div>
}