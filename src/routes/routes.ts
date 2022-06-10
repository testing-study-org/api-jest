import express from 'express'
import Item from '../models/item'
import {items} from '../db/items-db'

const itemsRouter = express.Router()

itemsRouter.post('/items', (req, res) => {

    const id: number = +req.body.id
    const nome: string = req.body.nome
    const descricao: string = req.body.descricao
    
    const item: Item = {
        id: id,
        nome: nome,
        descricao: descricao
    }

    if(id === undefined || nome === undefined || descricao === undefined){
        console.error('Item inválido')
        res.status(400).send({msg: 'Item inválido\n'}).end()
    } else {
        items.push(item)
        console.log("Adicionado: ")
        console.table(item)
        res.status(201).send({msg: 'Item adicionado com sucesso\n'}).end()
    }

})

itemsRouter.get('/items', (req, res) => {
    res.send(items).end()
})

itemsRouter.get('/items/:id', (req, res) => {
    const id: number = +req.params.id
    const foundItem = items.find(item => {
        if (item.id === id)
            return item;
    })

    if (foundItem === undefined){
        res.status(404).send({msg: 'Item não encontrado\n'}).end()
    } else {
        console.log("Listado: ")
        console.table(foundItem)
        res.send(foundItem).end()
    }
    
})

itemsRouter.put('/items/:id', (req, res) => {
    const id: number = +req.params.id

    const foundItem = items.find(item => {
        if (item.id === id)
            return item;
    })

    if (foundItem === undefined){
        res.status(404).send({msg: 'Item não encontrado\n'}).end()
    } else {
        const nome: string = req.body.nome
        const descricao: string = req.body.descricao

        const updatedItem: Item = {
            id: id,
            nome: nome,
            descricao: descricao
        }

        const foundItemIndex = items.indexOf(foundItem!)
        console.log(`item: ${foundItemIndex}`)
        console.table(foundItem)
        items[foundItemIndex] = updatedItem;
        
        console.log("Atualizado: ")
        console.table(items[foundItemIndex])
        res.status(204).send({msg: `Item atualizado com sucesso.`}).end()
    }

})

itemsRouter.delete('/items/:id', (req, res) => {
    const id: number = +req.params.id
    const item = items.find(item => {
        if (item.id === id)
            return item;
    })

    if (item === undefined){
        res.status(404).send({msg: 'Item não encontrado\n'}).end()
    } else {
        const itemToDelete = items.indexOf(item!)
        const deletedItem = items.splice(itemToDelete,1)

        console.log("Deletado: ")
        console.table(deletedItem)

        res.send({msg: 'Item deletado com sucesso.\n'}).end()
    }
    
})

export default itemsRouter;