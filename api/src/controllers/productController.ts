import { Request, Response } from "express";
import { Prisma } from "@prisma/client";
import { prisma } from "../libs/prisma";
import { generateProductCode } from "../utils/codeGenerator";
import { getStatusByQuantity } from "../utils/statusUtils";


export const createProduct = async (req: Request, res: Response) => {
    const data: Prisma.ProdutoCreateInput = {
        codigo: generateProductCode(8),
        nome: req.body.nome,
        descricao: req.body.descricao,
        preco: req.body.preco,
        categoria: req.body.categoria,
        quantidade: req.body.quantidade,
        status: getStatusByQuantity(req.body.quantidade)
    };

    try {
        const product = await prisma.produto.create({ data });
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error: "Failed to create product" });
    }
};

export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const product = await prisma.produto.findMany();
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error: "Failed to create product" });
    }
};

export const deleteProducts = async (req: Request, res: Response) => {
    try {
        const { ids } = req.body;

        if (!ids || !Array.isArray(ids)) {
            return res.status(400).json({ message: "IDs inválidos." });
        }

        await prisma.produto.deleteMany({
            where: {
                id: {
                    in: ids,
                },
            },
        });

        res.status(200).json({ message: "Produtos deletados com sucesso." });
    } catch (error) {
        console.error('Erro ao deletar produtos:', error);
        res.status(500).json({ message: "Erro ao deletar produtos." });
    }
};

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const data = {
            nome: req.body.data.nome,
            descricao: req.body.data.descricao,
            categoria: req.body.data.categoria,
            preco: req.body.data.preco,
            quantidade: parseInt(req.body.data.quantidade),
            status: getStatusByQuantity(req.body.data.quantidade)
        };

        const updatedProduct = await prisma.produto.update({
            where: { id: Number(req.body.data.id) },
            data
        });

        res.status(200).json({ message: "Produto atualizado com sucesso.", product: updatedProduct });
    } catch (error) {
        console.error('Erro ao atualizar o produto:', error);
        res.status(500).json({ message: "Erro ao atualizar o produto." });
    }
};

