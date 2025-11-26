export interface PromptData {
  title: string;
  role?: string;
  context?: string;
  content: string;
}

export interface SectionData {
  id: string;
  title: string;
  prompts: PromptData[];
}

export enum PageType {
  COVER = 'COVER',
  TOC = 'TOC', // Table of Contents
  PROMPT = 'PROMPT'
}

export interface BookPage {
  type: PageType;
  sectionId?: string;
  promptIndex?: number;
  data?: PromptData;
  pageNumber: number;
}