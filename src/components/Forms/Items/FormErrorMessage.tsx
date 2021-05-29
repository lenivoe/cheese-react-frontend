interface FormErrorMessageProps {
    download: { isPending: boolean; error?: Error };
    upload: { isPending: boolean; error?: Error };
}

const FormErrorMessage = ({ download, upload }: FormErrorMessageProps) => (
    <div>
        {download.isPending && <p>Загрузка данных...</p>}
        {download.error && <p>Ошибка при получении данных: {download.error.message}</p>}
        {upload.isPending && <p>Сохранение данных...</p>}
        {upload.error && <p>Ошибка при отправке данных: {upload.error.message}</p>}
    </div>
);

export default FormErrorMessage;
