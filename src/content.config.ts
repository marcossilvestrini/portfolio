import { defineCollection, z } from "astro:content";

// Schema para o perfil
const perfilCollection = defineCollection({
  type: "data",
  schema: z.object({
    nome: z.string(),
    cargo: z.string(),
    idade: z.number(),
    email: z.string().email(),
    telefone: z.string(),
    endereco: z.string(),
    sobre: z.array(z.string()),
    sociais: z.object({
      twitter: z.string().url().optional(),
      facebook: z.string().url().optional(),
      instagram: z.string().url().optional(),
      github: z.string().url().optional(),
      linkedin: z.string().url().optional(),
    }),
  }),
});

// Schema para as experiências
const experienciasCollection = defineCollection({
  type: "data",
  schema: z.object({
    ordem: z.number().optional(),
    cargo: z.string(),
    empresa: z.string(),
    periodo: z.string(),
    local: z.string().optional(),
    detalhes: z.array(z.string()), // Corresponde ao campo 'detalhes' no JSON
    perfis: z.array(z.string()),
  }),
});

// Schema para as habilidades
const habilidadesCollection = defineCollection({
  type: "data",
  schema: z.object({
    perfis: z.array(z.string()),
    titulo: z.string(),
    icon: z.string(),
    items: z.array(z.string()),
  }),
});

// Schema para as certificações
const certificacoesCollection = defineCollection({
  type: "data",
  schema: z.object({
    tipo: z.string(),
    titulo: z.string(),
    instituicao: z.string(),
    ano: z.string(),
    descricao: z.string(),
  }),
});

export const collections = {
  perfil: perfilCollection,
  experiencias: experienciasCollection,
  habilidades: habilidadesCollection,
  certificacoes: certificacoesCollection,
};
