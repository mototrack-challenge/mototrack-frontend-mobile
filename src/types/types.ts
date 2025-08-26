export type Movimentacao = {
  id_movimentacao: number;
  moto_id: number;
  departamento_id: number;
  departamento_descricao: string;
  data_movimentacao: string;
};

export type Moto = {
  id_moto: number;
  placa: string;
  chassi: string;
  modelo: string;
  status: string;
  movimentacoes: Movimentacao[];
};