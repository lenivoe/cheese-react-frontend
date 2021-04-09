import './App.css';
import useAxios from 'axios-hooks';

interface MenuItem {
    href: string;
    templated?: boolean;
}

interface MainMenuResponse {
    strainTypes: MenuItem;
    roles: MenuItem;
    factParameters: MenuItem;
    strains: MenuItem;
    systemUsers: MenuItem;
    properties: MenuItem;
    profile: MenuItem;
}

export default function AxiosHookExample() {
    const [{ data, loading, error }, execute] = useAxios<MainMenuResponse, any>(
        {
            url: 'localhost:8081',
        },
        {
            ssr: false,
        }
    );

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        console.log(error);
        return <p>Error!</p>;
    }

    return (
        <div style={{ marginLeft: '10px' }}>
            <button onClick={() => execute()}>refetch</button>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
}
