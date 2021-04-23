import useAxios from 'axios-hooks';
import { useState } from 'react';

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
    const [result, refetch] = useAxios<MainMenuResponse, any>({
        url: 'localhost:8081',
    });

    if (result.loading) {
        return <p>Loading...</p>;
    }

    if (result.error) {
        console.log(result.error);
        return <p>Error!</p>;
    }

    return (
        <div style={{ marginLeft: '10px' }}>
            <button onClick={() => refetch()}>refetch</button>
            <pre>{JSON.stringify(result.data, null, 2)}</pre>
        </div>
    );
}
