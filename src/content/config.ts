import { defineCollection, z } from 'astro:content';

const perfilCollection = defineCollection({
  type: 'data',
  schema: z.object({
    nome: z.string(),
    cargo: z.string(),
    idade: z.number(),
    email: z.string().email(),
    telefone: z.string(),
    endereco: z.string(),
    resumo: z.string(),
    sociais: z.object({
      github: z.string().url().optional(),
      linkedin: z.string().url().optional(),
    }),
  }),
});

const sobreCollection = defineCollection({
  type: 'data',
  schema: z.object({
    paragrafos: z.array(z.string()),
  }),
});

const experienciasCollection = defineCollection({
  type: 'data',
  schema: z.object({
    ordem: z.number().optional(),
    cargo: z.string(),
    empresa: z.string(),
    periodo: z.string(),
    local: z.string().optional(),
    detalhes: z.array(z.string()),
    perfis: z.array(z.string()),
  }),
});

const habilidadesCollection = defineCollection({
  type: 'data',
  schema: z.object({
    perfis: z.array(z.string()),
    categoria: z.string(),
    porcentagem: z.number().min(0).max(100).optional(),
    itens: z.array(
      z.object({
        subcategoria: z.string(),
        detalhes: z.array(z.string()),
      })
    ),
  }),
});

const certificacoesCollection = defineCollection({
  type: 'data',
  schema: z.object({
    tipo: z.string(),
    titulo: z.string(),
    instituicao: z.string(),
    ano: z.string(),
    descricao: z.string().optional(),
  }),
});

export const collections = {
  perfil: perfilCollection,
  sobre: sobreCollection,
  experiencias: experienciasCollection,
  habilidades: habilidadesCollection,
  certificacoes: certificacoesCollection,
};
