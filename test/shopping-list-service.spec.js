//  validation service
const shoppingListService = require('../src/shopping-list-service')
const knex = require('knex')

describe(`Shopping service object`, function () {
    let db
    let ShoppingItems = [
        {
            id: 1,
            name: 'First test name!',
            price: "123.12",
            date_added: new Date('2029-01-22T16:28:32.615Z'),
            checked: false,
            category: 'Main'
        },
        {
            id: 2,
            name: 'Second test name!',
            price: "10.12",
            date_added: new Date('2029-01-22T16:28:32.615Z'),
            checked: false,
            category: 'Snack'
        },
        {
            id: 3,
            name: 'Third test name!',
            price: "59.00",
            date_added: new Date('2029-01-22T16:28:32.615Z'),
            checked: false,
            category: 'Lunch'
        },
    ]
    before(() => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL,
        })
    })
    before(() => db('shopping_list').truncate())

    afterEach(() => db('shopping_list').truncate())

    after(() => db.destroy())

    context(`Given 'shopping_list' has data`, () => {
        beforeEach(() => {
            return db
                .into('shopping_list')
                .insert(ShoppingItems)
        })
        it(`getAllShoppingItems() resolves all articles from 'shopping_list' table`, () => {
            // test that shoppingListService.getAllShoppingItems gets data from table
            const expectedShoppingItems = ShoppingItems.map(ShoppingItems => ({
                ...ShoppingItems,
                checked: false,
            }));
            return shoppingListService.getAllShoppingItems(db)
                .then(actual => {
                    expect(actual).to.eql(ShoppingItems)
                })
        })
        it(`getById() resolves an ShoppingItem by id from 'shopping_list' table`, () => {
            const thirdId = 3
            const thirdItem = ShoppingItems[thirdId - 1]
            return shoppingListService.getById(db, thirdId)
                .then(actual => {
                    expect(actual).to.eql({
                        id: thirdId,
                        name: thirdItem.name,
                        date_added: thirdItem.date_added,
                        price: thirdItem.price,
                        category: thirdItem.category,
                        checked: false,
                    })
                })
        })
        it(`deleteShoppingItem() removes an ShoppingItem by id from 'shopping_list' table`, () => {
            const ShoppingItemId = 3
            return shoppingListService.deleteShoppingItem(db, ShoppingItemId)
                .then(() => shoppingListService.getAllShoppingItems(db))
                .then(allShoppingItems => {
                    // copy the test ShoppingItems array without the "deleted" ShoppingItem
                    const expected = ShoppingItems
                        .filter(ShoppingItems => ShoppingItems.id !== ShoppingItemId)
                    expect(allShoppingItems).to.eql(expected)
                })
        })
        it(`updateShoppingItem() updates an ShoppingItem from the 'shopping_list' table`, () => {
            const idOfShoppingItemToUpdate = 3
            const newShoppingItemData = {
                name: 'updated name',
                price: '10.00',
                // date_published: new Date(),
            }
            return shoppingListService.updateShoppingItem(db, idOfShoppingItemToUpdate, newShoppingItemData)
                .then(() => shoppingListService.getById(db, idOfShoppingItemToUpdate))
                .then(ShoppingItem => {
                    delete ShoppingItem.category
                    delete ShoppingItem.checked
                    delete ShoppingItem.date_added
                    expect(ShoppingItem).to.eql({
                        id: idOfShoppingItemToUpdate,
                        ...newShoppingItemData,
                    })
                })
        })
    })

    context(`Given 'shopping_list' has no data`, () => {
        it(`getAllShoppingItems() resolves an empty array`, () => {
            return shoppingListService.getAllShoppingItems(db)
                .then(actual => {
                    expect(actual).to.eql([])
                })
        })
        it(`insertShoppingItem() inserts a new ShoppingItem and resolves the new ShoppingItem with an 'id'`, () => {
            const newShoppingItem = {
                name: 'Test new name',
                price: '10.00',
                category: 'Main',
            }

            return shoppingListService.insertShoppingItem(db, newShoppingItem)
                .then(actual => {
                    delete actual.date_added
                    expect(actual).to.eql({
                        id: 1,
                        name: newShoppingItem.name,
                        price: newShoppingItem.price,
                        category: newShoppingItem.category,
                        checked: false
                    })
                })
        })
    })
})