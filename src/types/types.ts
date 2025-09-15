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
  alertas: Alerta[];
};

export type Alerta = {
  id_alerta: number;
  gravidade: string;
  mensagem: string;
  moto_id: number;
  data_alerta: string;
};

export type Departamento = {
  id_departamento: number;
  descricao: string;
};

export type Colaborador = {
  id: number;
  nome: string;
  matricula: string;
  email: string;
}

export type Servico = {
  id: number;
  descricao: string;
  dataCadastro: string;
  motoId: number
  colaboradorId: number;
}