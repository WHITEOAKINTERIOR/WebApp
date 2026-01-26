// app/our-works/[id]/layout.tsx
import { Metadata } from 'next';
import { commonContent } from '@/content/sharedContent';
import { projectsContent } from '@/content/projectsContent';

interface ProjectLayoutProps {
  params: {
    id: string;
  };
  children: React.ReactNode;
}

export async function generateMetadata({ params }: ProjectLayoutProps): Promise<Metadata> {
  // Ensure params is resolved
  const { id } = await params;
  const project = projectsContent.projects.find(p => p.id.toString() === id);
  
  return {
    title: `${project?.title || 'Project'} | ${commonContent.companyName}`,
    description: project?.description || 'Interior design project details',
    openGraph: {
      images: [project?.image || '/images/og-default.jpg'],
    },
  };
}

export default function ProjectLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}