// app/our-works/[id]/page.tsx
import { notFound } from 'next/navigation';
import { projectsContent } from '@/content/projectsContent';
import { ProjectDetails } from './project-details';

// Define the type for the params
type Params = {
  id: string;
};

// This is a server component
export default async function ProjectPage({ params }: { params: Params }) {
  // Await the params if needed
  const resolvedParams = await Promise.resolve(params);
  
  // Log the params for debugging
  console.log('Params in page:', resolvedParams);
  
  // Ensure params.id is a string
  const projectId = resolvedParams?.id?.toString();
  
  if (!projectId) {
    notFound();
  }

  const project = projectsContent.projects.find(
    (p) => p.id.toString() === projectId
  );

  if (!project) {
    notFound();
  }

  return <ProjectDetails project={project} />;
}

// Generate static params at build time
export async function generateStaticParams() {
  return projectsContent.projects.map((project) => ({
    id: project.id.toString(),
  }));
}

// This helps with type checking for generateStaticParams
export const dynamicParams = false; // Return 404 for non-existent projects