import { useCallback } from 'react';
import { useAsync } from 'react-async';
import { useParams } from 'react-router-dom';
import API from '../../../utils/API';

const useBackendData = () => {
    const { strainId: strainIdStr } = useParams<{ strainId?: string }>();

    const fetchData = useCallback(async () => {
        const strainId = strainIdStr ? Number.parseInt(strainIdStr, 10) : null;
        return Promise.all([
            API.genus.getAll(),
            API.type.getAll(),
            strainId ? API.strain.get(strainId) : undefined,
        ]);
    }, [strainIdStr]);

    const { data, error: downloadError, isPending } = useAsync(fetchData);

    return { data: data ?? [[], [], undefined], downloadError, isPending };
};

export default useBackendData;
