type Status = 'EM_ESTOQUE' | 'FORA_DE_ESTOQUE' | 'POUCO_ESTOQUE';

export const getStatusByQuantity = (quantity: number): Status => {
    if (quantity > 10) {
      return 'EM_ESTOQUE';
    } else if (quantity > 0) {
      return 'POUCO_ESTOQUE';
    } else {
      return 'FORA_DE_ESTOQUE';
    }
  };
  