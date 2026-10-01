const skillOrder = [
  'Infraestrutura',
  'Cloud Computing & Governança de TI',
  'DevOps, CI/CD & Containers',
  'Engenharia de Plataforma & DX',
  'Observabilidade & Monitoramento',
];

export function sortSkills<T extends { data: { categoria: string } }>(skills: T[]): T[] {
  return [...skills].sort((a, b) => {
    const aOrder = skillOrder.indexOf(a.data.categoria);
    const bOrder = skillOrder.indexOf(b.data.categoria);
    return (
      (aOrder === -1 ? Number.MAX_SAFE_INTEGER : aOrder) -
      (bOrder === -1 ? Number.MAX_SAFE_INTEGER : bOrder)
    );
  });
}
