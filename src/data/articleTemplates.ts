import templates from './articleTemplates.json';

export type ArticleTemplateKey = keyof typeof templates;

export const ARTICLE_TEMPLATES = templates;
export const DEFAULT_ARTICLE_TEMPLATE: ArticleTemplateKey = 'workflow-tutorial';

export const isArticleTemplateKey = (
  value: string
): value is ArticleTemplateKey => value in ARTICLE_TEMPLATES;
