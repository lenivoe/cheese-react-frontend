import axios from 'axios';
import FormalParameter from '../models/FormalParameter';
import Genus from '../models/Genus';
import ParamDataType from '../models/ParamDataType';
import FormalProperty from '../models/Property/FormalProperty';
import Strain from '../models/Strain';
import StrainType from '../models/StrainType';

const axiosInst = axios.create();

const apiConfig = {
    get baseURL() {
        return axiosInst.defaults.baseURL;
    },
    set baseURL(url: string | undefined) {
        axiosInst.defaults.baseURL = url;
    },
    defaultTimeout: 30000,
};

const timeoutMsg = (timeout: number) =>
    `истекло время ожидания (${timeout / 1000}с)`;
const getConfig = (timeout: number) => ({
    timeout,
    timeoutErrorMessage: timeoutMsg(timeout),
});

class Generator {
    static get<Ret>(url: string) {
        return async (timeout: number = apiConfig.defaultTimeout) => {
            const response = await axiosInst.get<Ret>(url, getConfig(timeout));
            return response.data;
        };
    }
    static getById<Ret>(url: (id: number) => string) {
        return async (
            id: number,
            timeout: number = apiConfig.defaultTimeout
        ) => {
            const response = await axiosInst.get<Ret>(
                url(id),
                getConfig(timeout)
            );
            return response.data;
        };
    }
    static post<Ret, Val = Ret>(url: string) {
        return async (value: Val, timeout: number = apiConfig.defaultTimeout) => {
            const response = await axiosInst.post<Ret>(
                url,
                value,
                getConfig(timeout)
            );
            return response.data;
        };
    }
    static deleteById<Ret>(url: (id: number) => string) {
        return async (
            id: number,
            timeout: number = apiConfig.defaultTimeout
        ) => {
            const response = await axiosInst.delete<Ret>(
                url(id),
                getConfig(timeout)
            );
            return response.data;
        };
    }
}

const strain = {
    getAll: Generator.get<Strain[]>('/strain'),
    get: Generator.getById<Strain>((id) => `/strain/${id}`),
    post: Generator.post<Strain>('/strain'),
    delete: Generator.deleteById<Strain>((id) => `/strain/${id}`),
};

const genus = {
    getAll: Generator.get<Genus[]>('/strain-genus'),
    getTypes: Generator.getById<StrainType[]>(
        (id) => `/strain-genus/${id}/types`
    ),
    post: Generator.post<Genus>('/strain-genus'),
    delete: Generator.deleteById<Genus>((id) => `/strain-genus/${id}`),
};

const type = {
    getAll: Generator.get<StrainType[]>('/strain-type'),
    getStrains: Generator.getById<StrainType[]>(
        (id) => `/strain-type/${id}/strains`
    ),
    post: Generator.post<StrainType>('/strain-type'),
    delete: Generator.deleteById<StrainType>((id) => `/strain-type/${id}`),
};

const property = {
    getAll: Generator.get<FormalProperty[]>('/property'),
    getAllWithParameters: Generator.get<FormalProperty[]>(
        '/property/with-params'
    ),
    get: Generator.getById<FormalProperty>((id) => `/property/${id}`),
    post: Generator.post<
        FormalProperty,
        FormalProperty | Omit<FormalProperty, 'id'>
    >('/property'),
    postWithParams: Generator.post<
        FormalProperty,
        FormalProperty | Omit<FormalProperty, 'id'>
    >('/property/with-params'),
    delete: Generator.deleteById<FormalProperty>((id) => `/property/${id}`),
};

const dataType = {
    getAll: Generator.get<ParamDataType[]>('/data-type'),
};

const formalParameter = {
    getAll: Generator.get<FormalParameter[]>('/formal-parameter'),
    get: Generator.getById<FormalParameter>((id) => `/formal-parameter/${id}`),
    post: Generator.post<
        FormalParameter,
        FormalParameter | Omit<FormalParameter, 'id'>
    >('/formal-parameter'),
    delete: Generator.deleteById<FormalParameter>(
        (id) => `/formal-parameter/${id}`
    ),
    isUsing: Generator.getById<boolean>(
        (id) => `/formal-parameter/in-use/${id}`
    ),
    isListUsing: Generator.post<{ [key: number]: boolean }, number[]>(
        '/formal-parameter/in-use-batch'
    ),
};

const API = {
    strain,
    genus,
    type,
    property,
    dataType,
    formalParameter,

    apiConfig,
};

export default API;
