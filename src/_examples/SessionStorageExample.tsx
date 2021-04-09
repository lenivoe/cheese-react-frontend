import RusDatePicker from '../components/RusDatePicker';
import { useSessionStorageState } from '../hooks/storage';

function SessionStorageExample() {
    const [dateStr, setDateStr] = useSessionStorageState(
        'sessionStorage-date',
        new Date().toString()
    );
    const [value, setValue] = useSessionStorageState('myValueInLocalStorage', 'sdsd');

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };
    return (
        <div style={{ marginLeft: '10px' }}>
            <h1>Hello React with Local Storage!</h1>

            <RusDatePicker
                selected={new Date(dateStr)}
                onChange={(date) => setDateStr((date as Date).toString())}
            />

            <div>
                <input value={value ?? '???'} type='text' onChange={onChange} />
            </div>

            <p>{value}</p>
        </div>
    );
}
