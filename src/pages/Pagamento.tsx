import React from "react";
import PagamentoAdmin from "../components/pagamentos/PagamentoAdmin";

interface PagamentoProps {
  isAdmin?: boolean;
}

const Pagamento: React.FC<PagamentoProps> = ({ isAdmin = false }) => {
  if (isAdmin) {
    return <PagamentoAdmin />;
  }

  return null; 
};

export default Pagamento;