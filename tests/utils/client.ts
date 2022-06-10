import axios from 'axios'
import Item from '../../src/models/item'


export async function fetchItems (url: string) {
    try {
        const response = await axios.get(url)
        const data = response.data
        return data;
    } catch (e){
        console.error(e)
        throw e;
    }
}

export async function fetchItem (url: string, id: number) {
    try {
        const response = await axios.get(`${url}/${id}`)
        const data = response.data;
    } catch (e){
        console.error(e)
        throw e;
    }
}

export async function deleteItem (url: string, id: number) {
    try {
        const response = await axios.delete(`${url}/${id}`)
        const data = response.data;
        return data;
    } catch (e){
        console.error(e)
        throw e;
    }
}

export async function createItem (url: string,item: Item) {
    try {
        const response = await axios.post(`${url}`, item)
        const data = response.data;
        return data;
    } catch (e){
        console.error(e)
        return [];
    }
}

export async function updateItem (url: string, item: Item) {
    try {
        const id : number = item.id;
        const response = await axios.put(`${url}/${id}`,item)
        return response;
    } catch (e){
        console.error(e)
        throw e;
    }
}

module.exports = [
    createItem,
    updateItem,
    deleteItem,
    fetchItem,
    fetchItems
]
