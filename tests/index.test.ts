import axios,{ AxiosPromise, AxiosRequestConfig, AxiosResponse, Method } from 'axios'
import { items } from '../src/db/items-db';
import Item from '../src/models/item';
import {createItem,updateItem,deleteItem,fetchItem,fetchItems} from './utils/client'
const {Response} = jest.requireActual('axios');
jest.mock("axios")

const URL = 'http://localhost:3000/api/items'

const mockedAxios = axios as jest.Mocked<typeof axios>;


describe('test api routes', () => {
    test('first test',() => {
        expect(1).toEqual(1)
    })

    it('should fetch items', async () => {

        const desiredItem: Item = {
            id: 1,
            nome: 'Arroz',
            descricao: 'Arroz parborizado 1 kg',
        };

        const mockedResponse: AxiosResponse = {
            data: desiredItem,
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {},
        }

        //TODO: completar os testes com mock
        mockedAxios.get.mockResolvedValueOnce(mockedResponse)

        expect(axios.get).not.toHaveBeenCalled();
        const data = await fetchItem(URL,1);
        expect(axios.get).toHaveBeenCalled();
        expect(data).toEqual(desiredItem);

   
    })
})