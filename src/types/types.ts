export type Movimentacao = {
  departamento: string;
  horario: string;
};

export type Moto = {
  id_moto: number;
  placa: string;
  modelo: string;
  status: string;
  departamento: string;
  movimentacoes: Movimentacao[];
};