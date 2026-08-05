import { Router } from "express";

const router = Router();

console.log("Arquivo productRoutes carregado");

const products = [
    {
        id: 1,
        name: "Notebook Gamer",
        price: 5000
    },

    {
        id: 2,
        name: "Celular",
        price: 2000
    },

    {
        id: 3,
        name: "Fone",
        price: 1500
    }
];

router.get("/", (req, res) => {
    console.log("Entrou na rota GET /products");

    res.json(products);
});


export default router;

router.post("/", (req, res) => {
    
    const newProduct = {
        id: products.length + 1,
        name: req.body.name,
        price: req.body.price
    };

    products.push(newProduct);

    res.status(201).json({
    message: "Produto adicionado com sucesso!",
    product: newProduct
    
    })
});

