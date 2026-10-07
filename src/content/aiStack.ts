type Resource = {
  id: string
  name: string
  kind: 'Tool' | 'Skill' | 'Skills' | 'MCP'
  summary: string
}

type ResourceGroup = {
  title: string
  resources: Resource[]
}

type AiStackContent = {
  title: string
  description: string
  groups: ResourceGroup[]
}

export const aiStack: AiStackContent = {
  title: 'AI\nStack',
  description:
    'The tools I work with, the skills and MCP servers I create and use, and the tools I’ve tried along the way. Open a resource to see how it works and download it when available.',
  groups: [
    {
      title: 'Current stack',
      resources: [
        { id: 'orca', name: 'Orca', kind: 'Tool', summary: '' },
        { id: 'cc-cli', name: 'CC CLI', kind: 'Tool', summary: 'Coding from the terminal.' },
        { id: 'codex-cli', name: 'Codex CLI', kind: 'Tool', summary: 'Coding from the terminal.' },
        { id: 'figma', name: 'Figma', kind: 'Tool', summary: 'Design and layout exploration.' },
      ],
    },
    {
      title: 'Created by me',
      resources: [
        { id: 'create-llm-wiki', name: 'Create LLM Wiki', kind: 'Skill', summary: 'Create and maintain a wiki for an AI agent.' },
      ],
    },
    {
      title: 'In use',
      resources: [
        { id: 'poteto-skills', name: 'Poteto skills', kind: 'Skills', summary: 'Reusable skills by Poteto.' },
        { id: 'figma-mcp', name: 'Figma', kind: 'MCP', summary: 'Inspect and edit layouts and components.' },
        { id: 'asd-ste100', name: 'ASD-STE100', kind: 'Skill', summary: 'Write precise technical explanations.' },
        { id: 'agent-browser', name: 'Agent browser', kind: 'Skill', summary: 'Navigate and inspect websites.' },
        { id: 'image-generation', name: 'Image generation', kind: 'Skill', summary: 'Create and edit visual assets.' },
        { id: 'documents', name: 'Documents', kind: 'Skill', summary: 'Read and create editable documents.' },
        { id: 'pdf', name: 'PDF', kind: 'Skill', summary: 'Read, create and inspect PDF files.' },
        { id: 'skill-creator', name: 'Skill creator', kind: 'Skill', summary: 'Create and improve agent skills.' },
        { id: 'google-workspace', name: 'Google Workspace', kind: 'Skill', summary: 'Work with shared documents and spreadsheets.' },
      ],
    },
    {
      title: 'Things I tried',
      resources: [
        { id: 'pi', name: 'Pi', kind: 'Tool', summary: '' },
        { id: 'vs-code-extension', name: 'VS Code extension', kind: 'Tool', summary: '' },
        { id: 'antigravity', name: 'Antigravity', kind: 'Tool', summary: '' },
        { id: 'cursor', name: 'Cursor', kind: 'Tool', summary: '' },
      ],
    },
  ],
}
