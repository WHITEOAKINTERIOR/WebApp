import { MetadataRoute } from 'next'
import { projectsContent } from '../content/projectsContent'

const URL = 'https://www.whiteoakinterior.com'

// Mock function - replace with your actual data fetching logic
async function getWorks() {
  // Example: Fetch from your API or database
  // const res = await fetch('https://api.yoursite.com/works')
  // return res.json()
  
  // For now, return mock data
  return projectsContent.projects.map(project => ({
    id: project.id,
    updatedAt: project.updatedAt || new Date().toISOString().split('T')[0],
  }))
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static routes
  const staticRoutes = ['', '/about', '/contact', '/services', '/our-work'].map(route => ({
    url: `${URL}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Dynamic routes for works
  const works = await getWorks()
  const workRoutes = works.map(work => ({
    url: `${URL}/our-work/${work.id}`,
    lastModified: work.updatedAt || new Date().toISOString().split('T')[0],
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...workRoutes]
}