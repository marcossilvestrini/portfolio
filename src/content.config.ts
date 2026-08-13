import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const perfilCollection = defineCollection({
  loader: glob({ pattern: ['*.json', '!_*.json'], base: './src/content/perfil' }),
  schema: z.object({
    nome: z.string(),
    cargo: z.string(),
    idade: z.number(),
    email: z.string(),
    telefone: z.string(),
    endereco: z.string(),
    sobre: z.array(z.string()),
    sociais: z.object({
      twitter: z.string().optional(),
      facebook: z.string().optional(),
      instagram: z.string().optional(),
      github: z.string().optional(),
      linkedin: z.string().optional(),
    }),
  }),
});

const experienciasCollection = defineCollection({
  loader: glob({ pattern: ['*.json', '!_*.json'], base: './src/content/experiencias' }),
  schema: z.object({
    ordem: z.number(),
    cargo: z.string(),
    empresa: z.string(),
    periodo: z.string(),
    detalhes: z.array(z.string()),
    perfis: z.array(z.enum(['plataforma', 'devops', 'infraestrutura'])),
  }),
});

const habilidadesCollection = defineCollection({
  loader: glob({ pattern: ['*.json', '!_*.json'], base: './src/content/habilidades' }),
  schema: z.object({
    categoria: z.string(),
    porcentagem: z.number(),
    corBarra: z.string(),
    perfis: z.array(z.enum(['plataforma', 'devops', 'infraestrutura'])),
    itens: z.array(
      z.object({
        subcategoria: z.string(),
        detalhes: z.array(z.string()),
      })
    ),
  }),
});

const certificacoesCollection = defineCollection({
  loader: glob({ pattern: ['*.json', '!_*.json'], base: './src/content/certificacoes' }),
  schema: z.object({
    tipo: z.enum(['certificacao', 'formacao']),
    titulo: z.string(),
    instituicao: z.string(),
    ano: z.string(),
    descricao: z.string().optional(),
  }),
});

export const collections = {
  perfil: perfilCollection,
  experiencias: experienciasCollection,
  habilidades: habilidadesCollection,
  certificacoes: certificacoesCollection,
};
