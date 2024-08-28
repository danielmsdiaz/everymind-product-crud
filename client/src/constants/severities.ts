export const getSeverity = (value: string) => {
    switch (value) {
      case 'EM_ESTOQUE':
        return 'success';
      case 'POUCO_ESTOQUE':
        return 'warning';
      case 'FORA_DE_ESTOQUE':
        return 'danger';
      default:
        return null;
    }
  };