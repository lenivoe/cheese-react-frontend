import DatePicker, { ReactDatePickerProps } from 'react-datepicker';
import ru from 'date-fns/locale/ru';
import 'react-datepicker/dist/react-datepicker.css';

export default function RusDatePicker(props: ReactDatePickerProps) {
    const { locale = ru, dateFormat = 'dd.MM.yyyy', ...rest } = props;
    return <DatePicker locale={locale} dateFormat={dateFormat} {...rest} />;
}
