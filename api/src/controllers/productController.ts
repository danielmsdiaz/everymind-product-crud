import { Request, Response } from "express";
import { Prisma } from "@prisma/client";
import { prisma } from "../libs/prisma";
import { generateProductCode } from "../utils/codeGenerator";


export const createProduct = async (req: Request, res: Response) => {
    const data: Prisma.ProdutoCreateInput = {
        codigo: generateProductCode(8),
        nome: req.body.nome,
        descricao: req.body.descricao,
        preco: req.body.preco,
        categoria: req.body.categoria,
        status: req.body.status
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

