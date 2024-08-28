import { nanoid } from 'nanoid';

export function generateProductCode(length: number = 8): string {
    return nanoid(length);
}
