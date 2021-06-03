interface FormErrorMessageProps {
    download: { isPending: boolean; error?: Error };
    upload: { isPending: boolean; error?: Error };
}

const FormErrorMessage = ({ download, upload }: FormErrorMessageProps) => (
    <>
        {download.isPending && <div className='loading'>Загрузка данных...</div>}
        
        {upload.isPending && <div className='loading'>Сохранение данных...</div>}

        {download.error && (
            <div className='field-error'>
                Ошибка при получении данных: {download.error.message}
            </div>
        )}

        {upload.error && (
            <div className='field-error'>
                Ошибка при отправке данных: {upload.error.message}
            </div>
        )}
    </>
);

export default FormErrorMessage;
