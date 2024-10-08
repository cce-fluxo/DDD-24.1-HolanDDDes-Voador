import React, { createContext, useState, useContext, ReactNode } from 'react';

const FormContext = createContext({
    formData: {},
    setFormData: (data: any) => {}
});

export const FormProvider = ({ children }: { children: ReactNode }) => {
    const [formData, setFormData] = useState({});

    return (
        <FormContext.Provider value={{ formData, setFormData }}>
            {children}
        </FormContext.Provider>
    );
};

export const useForm = () => useContext(FormContext);