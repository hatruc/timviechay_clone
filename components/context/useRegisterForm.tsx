import { ReactNode, createContext, useContext, useState } from 'react';

interface MyContextType {
    register: (lable: string, e: any, validate?: any) => void;
    data: object,

}
const formContext = createContext<MyContextType | undefined>(undefined);

export const RegisterForm: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [data, setData] = useState<any>({});
    const register = (lable: string, e: any, validate?: any) => {
        data[lable] = e.target.value;
    }
    return (
        <formContext.Provider value={{ register, data }}>
            {children}
        </formContext.Provider>
    );
}

export const useMyContext = () => {
    const context = useContext(formContext);
    if (!context) {
        throw new Error("useMyContext must be used within a MyContextProvider");
    }
    return context;
}