import { SerializedError } from '@reduxjs/toolkit';

interface FormErrorMessageProps {
    loading: boolean;
    error?: Error | SerializedError;
}

const FormErrorMessage = ({ loading, error }: FormErrorMessageProps) => {
    return (
        <>
            {loading && <div className='loading'>Загрузка данных...</div>}
            {error && (
                <div className='field-error'>
                    Ошибка при загрузке данных: {error?.message}
                </div>
            )}
        </>
    );
};

export default FormErrorMessage;
