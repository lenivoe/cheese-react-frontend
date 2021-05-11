import axios from 'axios';
import Strain, { Genus, StrainType } from '../models/strain/strain';

const defaultTimeout = 30000;
const timeoutMsg = (timeout: number) => `истекло время ожидания (${timeout / 1000}с)`;
const getConfig = (timeout: number) => ({
    timeout,
    timeoutErrorMessage: timeoutMsg(timeout),
});

export async function getAllStrains(timeout: number = defaultTimeout) {
    const response = await axios.get<Strain[]>(`/strain`, getConfig(timeout));
    return response.data;
}

export async function getStrain(id: number, timeout: number = defaultTimeout) {
    const response = await axios.get<Strain>(`/strain/${id}`, getConfig(timeout));
    return response.data;
}

export async function postStain(strain: Strain, timeout: number = defaultTimeout) {
    const response = await axios.post<Strain>('/save', strain, getConfig(timeout));
    return response.data;
}

export async function getAllGenera(timeout: number = defaultTimeout) {
    const response = await axios.get<Genus[]>(`/strain-genus`, getConfig(timeout));
    return response.data;
}

export async function getAllStrainTypes(timeout: number = defaultTimeout) {
    const response = await axios.get<StrainType[]>(`/strain-type`, getConfig(timeout));
    return response.data;
}

export async function getStrainTypeByGenus(genusId:number, timeout: number = defaultTimeout) {
    const response = await axios.get<StrainType[]>(`/strain-genus/` + genusId + `/types`, getConfig(timeout));
    return response.data;
}

export async function getStrainsByType(typeId:number, timeout: number = defaultTimeout) {
    const response = await axios.get<Strain[]>(`/strain-genus/` + typeId + `/types`, getConfig(timeout));
    return response.data;
}

export async function getAllPropertiesWithParameters(timeout: number = defaultTimeout) {
    const response = await axios.get<StrainType[]>(
        `/property/with_parameters`,
        getConfig(timeout)
    );
    return response.data;
}
