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

const timeoutMsg = (timeout: number) => `истекло время ожидания (${timeout / 1000}с)`;
const getConfig = (timeout: number) => ({
    timeout,
    timeoutErrorMessage: timeoutMsg(timeout),
});

class Generator {
    static get<T>(url: string) {
        return async (timeout: number = apiConfig.defaultTimeout) => {
            const response = await axiosInst.get<T>(url, getConfig(timeout));
            return response.data;
        };
    }
    static getById<T>(url: (id: number) => string) {
        return async (id: number, timeout: number = apiConfig.defaultTimeout) => {
            const response = await axiosInst.get<T>(url(id), getConfig(timeout));
            return response.data;
        };
    }
    static post<T>(url: string) {
        return async (value: T, timeout: number = apiConfig.defaultTimeout) => {
            const response = await axiosInst.post<T>(url, value, getConfig(timeout));
            return response.data;
        };
    }
    static deleteById<T>(url: (id: number) => string) {
        return async (id: number, timeout: number = apiConfig.defaultTimeout) => {
            const response = await axiosInst.delete<T>(url(id), getConfig(timeout));
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
    getTypes: Generator.getById<StrainType[]>((id) => `/strain-genus/${id}/types`),
    post: Generator.post<Genus>('/strain-genus'),
    delete: Generator.deleteById<Genus>((id) => `/strain-genus/${id}`),
};

const type = {
    getAll: Generator.get<StrainType[]>('/strain-type'),
    getStrains: Generator.getById<StrainType[]>((id) => `/strain-type/${id}/strains`),
    post: Generator.post<StrainType>('/strain-type'),
    delete: Generator.deleteById<StrainType>((id) => `/strain-type/${id}`),
};

const property = {
    getAll: Generator.get<FormalProperty[]>('/property'),
    getAllWithParameters: Generator.get<FormalProperty[]>('/property/with_parameters'),
    get: Generator.getById<FormalProperty>((id) => `/property/${id}`),
    post: Generator.post<FormalProperty>('/property'),
    delete: Generator.deleteById<FormalProperty>((id) => `/property/${id}`),
};

const dataType = {
    getAll: Generator.get<ParamDataType[]>('/data-type'),
};

const formalParameter = {
    getAll: Generator.get<FormalParameter[]>('/formal-parameter'),
    get: Generator.getById<FormalParameter>((id) => `/formal-parameter/${id}`),
    post: Generator.post<FormalParameter>('/formal-parameter'),
    delete: Generator.deleteById<FormalParameter>((id) => `/formal-parameter/${id}`),
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
