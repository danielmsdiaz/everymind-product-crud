import { ProductType } from "../types/productType";
import api from "./axios";

export const apiService = {
    postProduct: async (data: ProductType) => {
        try {
            const response = await api.post("", data);
            return response.data;
        } catch (error) {
            console.error('ERROR POST:', error);
            throw error;
        }
    },

    getProducts: async () => {
        try {
            const response = await api.get("");
            return response.data;
        } catch (error) {
            console.error('ERROR GET:', error);
            throw error;
        }
    },

    deleteProducts: async (ids: number[]) => {
        try {
            const response = await api.delete('/', { data: { ids } });
            return response.data;
        } catch (error) {
            console.error('ERROR DELETE:', error);
            throw error;
        }
    },

    updateProduct: async (data: ProductType) => {
        try {
            const response = await api.put('/', {data});
            return response.data;
        } catch (error) {
            console.error('ERROR UPDATE:', error);
            throw error;
        }
    },
};
