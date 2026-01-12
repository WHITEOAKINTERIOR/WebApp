// components/theme-showcase.tsx
'use client'

import { cn } from "@/lib/utils"

export function ThemeShowcase() {
  const colorPalette = [
    { name: 'background', value: 'bg-background text-foreground' },
    { name: 'foreground', value: 'bg-foreground text-background' },
    { name: 'primary', value: 'bg-primary text-primary-foreground' },
    { name: 'secondary', value: 'bg-secondary text-secondary-foreground' },
    { name: 'muted', value: 'bg-muted text-muted-foreground' },
    { name: 'accent', value: 'bg-accent text-accent-foreground' },
    { name: 'destructive', value: 'bg-destructive text-destructive-foreground' },
  ]

  const primaryShades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map(shade => ({
    name: `primary-${shade}`,
    value: `bg-primary-${shade} ${shade > 400 ? 'text-white' : 'text-foreground'}`
  }))

  const typography = [
    { name: 'Heading 1', className: 'text-4xl font-bold' },
    { name: 'Heading 2', className: 'text-3xl font-bold' },
    { name: 'Heading 3', className: 'text-2xl font-semibold' },
    { name: 'Body Large', className: 'text-lg' },
    { name: 'Body', className: 'text-base' },
    { name: 'Small', className: 'text-sm' },
    { name: 'Muted', className: 'text-muted-foreground' },
  ]

  return (
    <div className="space-y-12 p-6">
      <section>
        <h2 className="text-2xl font-bold mb-4">Color Palette</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {colorPalette.map((color) => (
            <div key={color.name} className="rounded-lg overflow-hidden border">
              <div className={cn('p-6 h-32 flex items-end', color.value)}>
                <span className="font-mono text-sm bg-black/10 px-2 py-1 rounded">
                  {color.name}
                </span>
              </div>
              <div className="p-4 bg-card">
                <code className="text-xs">bg-{color.name}</code>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Primary Color Shades</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-11 gap-2">
          {primaryShades.map((shade) => (
            <div key={shade.name} className="text-center">
              <div className={cn('h-20 rounded-t flex items-center justify-center', shade.value)}>
                <span className="text-xs font-mono">{shade.name.split('-')[1]}</span>
              </div>
              <div className="bg-card p-1 rounded-b">
                <code className="text-xs">bg-{shade.name}</code>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Typography</h2>
        <div className="space-y-4">
          {typography.map((type) => (
            <div key={type.name} className={type.className}>
              {type.name} - The quick brown fox jumps over the lazy dog
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Buttons</h2>
        <div className="flex flex-wrap gap-4">
          <button className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90">
            Primary
          </button>
          <button className="px-4 py-2 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground">
            Secondary
          </button>
          <button className="px-4 py-2 rounded-md bg-destructive text-destructive-foreground hover:bg-destructive/90">
            Destructive
          </button>
          <button className="px-4 py-2 rounded-md bg-muted text-muted-foreground hover:bg-muted/80">
            Muted
          </button>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-lg p-6 space-y-4">
            <h3 className="text-lg font-semibold">Card Title</h3>
            <p className="text-muted-foreground">
              This is a sample card with some content to demonstrate the card styling.
            </p>
            <button className="text-primary hover:underline">Learn more</button>
          </div>
          <div className="border rounded-lg p-6 bg-muted/50 space-y-4">
            <h3 className="text-lg font-semibold">Muted Card</h3>
            <p className="text-muted-foreground">
              This card has a muted background to show contrast.
            </p>
            <button className="px-3 py-1 text-sm rounded-md bg-primary text-primary-foreground">
              Action
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}