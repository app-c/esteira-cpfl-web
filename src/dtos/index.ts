/* eslint-disable no-use-before-define */
/* eslint-disable camelcase */
export interface IProsEster {
  id: string
  Nota: string
  // Tipo: string;
  // Descricao_da_nota: string;
  // TAM: string;
  // Depart: string;
  // Divisão: string;
  // Bop: string;
  cidade: string
  // Distribuidora: string;
  // Fábrica: string;
  // Status: string;
  // Código: string;
  // Texto_cod_medida: string;
  // Texto_das_medidas: string;
  // Dt_Criação: string;
  Dt_programação: string
  TLE: string
  // Local_inst: string;
  // Lati: string;
  // Long: string;
  // Alimentador: string;
  // Conjunto_elétrico: string;
  // Qtde_clientes: string;
  // CHI_max: string;
  // Obra_livre: string;
  // Nota_pai: string;
  // Possui_DI: string;
  // Num_DI: string;
  // Possui_viab: string;
  // Data_viab: string;
  // Dt_Empreita: string;
  // Mês_empreita: string;
  // Ano_empreita: string;
  // Km: string;
  MO: number
  // CAPEX: string;
  EQUIPE?: IPropsEquipe[]
  SUPERVISOR?: string
  situation?:
    | 'estera'
    | 'processo'
    | 'parcial'
    | 'executada'
    | 'cancelada'
    | 'retorno_parcial'
    | 'nt_parcial'
    | 'nt_cancelada'
    | 'preview'
  PORCENTUAL?: number
  // Dt_parcial?: string
  // Dt_cancelada?: string
  obsPlanejamento?: string
  obsExecuçao: string
  obsTratativa: string
  updateAt: string
}

export interface IC4 {
  id: string
  valor: number
  evento: number
  data: string
}

export interface IProsFuncionarios {
  id: string
  MOBILIDADE: boolean
  cargo: string
  cm: string
  equipe: string
  matricula: number
  nome: string
}

export interface IPropsEquipe {
  id: string
  equipe: string
  mobilidade: boolean
  dados: IProsFuncionarios[]
  faturamento: number
}

export interface IFaturamento {
  data: string
  id: string
  valor: number
}

export interface INtSituation {
  name: string
  sigla: string
  id: number
  color1: string
  color: string
}

export interface IAlert {
  name: string
  ico: string
  id: number
}
