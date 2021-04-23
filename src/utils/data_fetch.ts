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

export async function getAllGenera(timeout: number = defaultTimeout) {
    const response = await axios.get<Genus[]>(`/strain-genus`, getConfig(timeout));
    return response.data;
}

export async function getAllStrainTypes(timeout: number = defaultTimeout) {
    const response = await axios.get<StrainType[]>(`/strain-type`, getConfig(timeout));
    return response.data;
}

// property/with_parameters

export async function getAllPropertiesWithParameters(timeout: number = defaultTimeout) {
    const response = await axios.get<StrainType[]>(
        `/property/with_parameters`,
        getConfig(timeout)
    );
    return response.data;
}

// export async function getGenusTypeMap(timeout: number = defaultTimeout) {
//     const [types, genera] = await Promise.all([
//         getAllStrainTypes(timeout),
//         getAllGenera(timeout),
//     ]);

//     console.log(genera);

//     const genusToTypeMap = new Map(
//         genera.map((genus) => [genus.id, { genus, types: [] as Type[] }])
//     );

//     for (let type of types) {
//         const item = genusToTypeMap.get(type.genus.id)!;
//         item.types.push(type);
//     }

//     return genusToTypeMap;
// }
