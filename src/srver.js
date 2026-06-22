import express from "express"
const app = express();


app.get('/hello', (req, res) => {
    res.json({ message: 'Hello World!' });
});


const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});