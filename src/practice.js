require('dotenv').config()
const knex = require('knex')

const knexInstance = knex({
    client: 'pg',
    connection: process.env.DB_URL
})

// const qry = knexInstance
//     .select('product_id', 'name', 'price', 'category')
//     .from('amazong_products')
//     .where({ name: 'Point of view gun' })
//     .first()
//     .toQuery()

// console.log(qry)

// const searchTerm = 'holo'

// knexInstance
//     .select('product_id', 'name', 'price', 'category')
//     .from('amazong_products')
//     .where('name', 'ILIKE', `%${searchTerm}%`)
//     .then(result => {
//         console.log(result)
//     })

// function searchByProduceName(searchTerm) {
//     knexInstance
//         .select('product_id', 'name', 'price', 'category')
//         .from('amazong_products')
//         .where('name', 'ILIKE', `%${searchTerm}%`)
//         .then(result => {
//             console.log(result)
//         })
// }

// searchByProduceName('holo')

// searchByProduceName('holo')

// function paginateProducts(page) {
//     const productsPerPage = 10
//     const offset = productsPerPage * (page - 1)
//     knexInstance
//         .select('product_id', 'name', 'price', 'category')
//         .from('amazong_products')
//         .limit(productsPerPage)
//         .offset(offset)
//         .then(result => {
//             console.log(result)
//         })
// }

CREATE TABLE IF NOT EXISTS whopipe_video_views(
    view_id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    video_name TEXT NOT NULL,
    region TEXT NOT NULL,
    date_viewed TIMESTAMP DEFAULT now() NOT NULL
);

DROP TYPE IF EXISTS department;
CREATE TYPE department AS ENUM(
    'Electronics',
    'Cleaning',
    'Grocery',
    'Furniture',
    'Stationery',
    'Clothing',
    'DIY',
    'Sports',
    'Homeware',
    'Games',
    'Transport'
);


paginateProducts(2)


