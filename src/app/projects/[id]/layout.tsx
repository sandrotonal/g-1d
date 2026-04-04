import { Metadata } from 'next';
import { projects } from '@/data/projects';

interface Props {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const projectId = parseInt(id);
  const project = projects.find(p => p.id === projectId);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  const title = `${project.title} | Project`;
  const description = project.description;
  const imageUrl = project.image.startsWith('http') 
    ? project.image 
    : `https://gucluyumhe.dev${project.image}`;

  return {
    title,
    description,
    keywords: [...project.technologies, ...project.categories, 'project', 'portfolio', 'Ömer Özbay'],
    authors: [{ name: 'Ömer Özbay' }],
    openGraph: {
      type: 'article',
      title,
      description,
      url: `https://gucluyumhe.dev/projects/${project.id}`,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${project.title} - Project Screenshot`,
        },
      ],
      authors: ['Ömer Özbay'],
      tags: project.technologies,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
      creator: '@gucluyumhe',
    },
    alternates: {
      canonical: `https://gucluyumhe.dev/projects/${project.id}`,
    },
  };
}

export default function ProjectLayout({ children }: Props) {
  return <>{children}</>;
}
