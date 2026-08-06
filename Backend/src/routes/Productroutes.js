import { Router } from "express";

const router = Router();

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
    res.json(products);
});

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
    });
});

router.delete("/:id", (req, res) => {
    const id = Number(req.params.id);

    const index = products.findIndex(product => product.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Produto não encontrado!"
        });
    }

    const deletedProduct = products.splice(index, 1);

    res.status(200).json({
        message: "Produto removido com sucesso!",
        product: deletedProduct[0]
    });
});

export default router;

router.put("/:id", (req, res) => {
    const id = Number(req.params.id);

    const product = products.find(product => product.id === id);

    if (!product) {
        return res.status(404).json({
            message: "Produto não encontrado!"
        });
    }

    product.name = req.body.name;
    product.price = req.body.price;

    res.status(200).json({
        message: "Produto atualizado com sucesso!",
        product
    });
});