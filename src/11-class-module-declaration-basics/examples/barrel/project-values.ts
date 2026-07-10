export type ProjectSummary = {
  readonly id: string;
  readonly title: string;
  readonly status: 'active' | 'archived';
};

export const projectStatusLabels: Readonly<Record<ProjectSummary['status'], string>> = {
  active: '進行中',
  archived: 'アーカイブ',
};

export function createProjectLabel(project: ProjectSummary): string {
  return `${project.id}:${project.title}`;
}
