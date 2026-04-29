import fs from 'fs';
import path from 'path';

const contentFilePath = path.join(process.cwd(), 'data', 'content.json');

export type ContentData = {
  hero: {
    imageSrc: string;
    imageAlt: string;
    eyebrow: string;
    heading: string;
    subheading: string;
  };
  philosophy: {
    quote: string;
    founderName: string;
  };
};

export async function getContent(): Promise<ContentData> {
  try {
    const fileContents = await fs.promises.readFile(contentFilePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error('Error reading content.json:', error);
    throw new Error('Failed to load content');
  }
}

export async function saveContent(data: ContentData): Promise<void> {
  try {
    await fs.promises.writeFile(contentFilePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing to content.json:', error);
    throw new Error('Failed to save content');
  }
}
