import React from 'react';
import { useAsync } from 'react-async';
import { useParams } from 'react-router-dom';
import Strain from '../../../models/Strain';
import API from '../../../utils/API';
import { AnyObj } from '../../../utils/utils';

const download = async ({ strainId }: { strainId?: string } & AnyObj) => {
    const id = strainId ? Number.parseInt(strainId, 10) : undefined;
    return Promise.all([
        API.genus.getAll(),
        API.type.getAll(),
        id ? API.strain.get(id) : undefined,
    ]);
};

export const useDownloadData = () => {
    const { strainId } = useParams<{ strainId?: string }>();
    return useAsync(download, { strainId, watch: strainId });
};

const upload = ([strain]: Strain[]) => API.strain.post(strain);

export const useUploadStrain = () => useAsync({ deferFn: upload });
