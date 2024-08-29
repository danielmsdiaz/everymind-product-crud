export type ProductType = {
    id?: number,
    codigo?: string,
    nome: string,
    descricao: string,
    categoria: string | null,
    preco: number,
    quantidade?: number
    status?: string
}

export const productTypeModel = {
    nome: '',
    descricao: '',
    categoria: null as string | null,
    preco: 0,
    quantidade: 0,
}