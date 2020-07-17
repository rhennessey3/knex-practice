require('dotenv').config()

const knex = require('knex')
const shoppingListService = require('./shopping-list-service')

const knexInstance = knex({
    client: 'pg',
    connection: process.env.DB_URL,
})

// use all the ShoppingListService methods!!
shoppingListService.getAllShoppingItems(knexInstance)
    .then(AllShoppingItems => console.log(AllShoppingItems))
    .then(() =>
        shoppingListService.insertShoppingItem(knexInstance, {
            name: 'New name',
            price: 'New price',
            date_published: new Date(),
            // checked: New bool ???
        })
    )
    .then(newShoppingItem => {
        console.log(newShoppingItem)
        return shoppingListService.updateShoppingItem(
            knexInstance,
            newShoppingItem.id,
            { name: 'Updated name' }
        ).then(() => shoppingListService.getById(knexInstance, newShoppingItem.id))
    })
    .then(ShoppingItem => {
        console.log(ShoppingItem)
        return shoppingListService.deleteShoppingItem(knexInstance, ShoppingItem.id)
    })
