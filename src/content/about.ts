type AboutEntry = {
  title: string
  roles: string[]
  details: string[]
  bullets: string[]
}

type AboutGroup = {
  label: string
  entries: AboutEntry[]
}

type AboutContent = {
  title: string
  paragraphs: string[]
  groups: AboutGroup[]
}

export const about: AboutContent = {
  title: 'About',
  paragraphs: [
    'I’m a Computer Engineering graduate based in Barcelona. I’m interested in the connection between product engineering, frontend development, design and AI tools.',
    'My background includes academic research at BSC and teaching-assistant coordination at La Salle.',
  ],
  groups: [
    {
      label: 'Experience',
      entries: [
        {
          title: 'Barcelona Supercomputing Center',
          roles: ['Research Intern in Memory Systems for HPC & AI'],
          details: [],
          bullets: [
            'Contributed to developing MESS, a memory benchmarking and simulation framework.',
            'Worked on memory systems and performance analysis.',
          ],
        },
        {
          title: 'La Salle',
          roles: ['Teaching Assistant / Teaching Assistant Coordinator', 'Programming I and Programming Projects I'],
          details: [],
          bullets: [
            'Supported students learning C.',
            'Guided project teams using Scrum, TDD, Git and GitHub.',
            'Coordinated teaching assistants and automated grading workflows.',
          ],
        },
      ],
    },
    {
      label: 'Education',
      entries: [
        {
          title: 'Computer Engineering',
          roles: [],
          details: ['La Salle Campus Barcelona', 'Be a Leader Scholarship for academic merit'],
          bullets: [],
        },
        {
          title: 'Warsaw University of Technology',
          roles: [],
          details: ['Exchange semester · February to June 2025'],
          bullets: [],
        },
      ],
    },
  ],
}
