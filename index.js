import express from 'express'

const app = express()
const port = 3000
app.use(express.json())

let bookData = []
let nextId= 1

//add a new book
app.post('/books', (req,res) => {
    const {name,price} = req.body
    const newBook = {id: nextId++, name, price}
    bookData.push(newBook)
    res.status(201).send(newBook)
})

//list books
app.get('/books', (req,res) => {
    res.status(200).send(bookData)
})

//get a book with id
app.get('/books/:id', (req,res) => {
    const book = bookData.find(b => b.id === parseInt(req.params.id))
    if(!book){
        return res.status(404).send('Book not found')
    }
    res.status(200).send(book)
})

//update tea
app.put('books/:id', (req,res) => {
    const book = bookData.find((b) => b.id === parseInt(req.params.id));
    if (!book) {
      return res.status(404).send("Book not found");
    }
    const {name,price} = req.body
    book.name = name
    book.price = price
    res.status(200).send(book)
})

//delete book
app.delete('/books/:id', (req,res) => {
    const index = bookData.findIndex(b => b.id === parseInt(req.params.id))
    if(index === -1){
        return res.status(404).send('book not found')
    }
    bookData.splice(index,1)
    return res.status(204).send('deleted')
})

app.listen(port, () => {
    console.log(`Server is running at port: ${port}...`)
})