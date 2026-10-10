type DirectoryLink = {
  name: string
  kind: 'X' | 'YouTube' | 'Website' | 'Spotify'
  detail: string
  url: string
}

type LinkGroup = {
  title: string
  links: DirectoryLink[]
}

type Book = {
  title: string
  author: string
}

type DirectoryContent = {
  title: string
  description: string
  linkGroups: LinkGroup[]
  booksTitle: string
  books: Book[]
}

export const directory: DirectoryContent = {
  title: 'Directory',
  description:
    'People, channels and websites I follow across design and technology, alongside music and books I return to. A collection of references, ideas and influences.',
  linkGroups: [
    {
      title: 'Design',
      links: [
        { name: 'studiobakers', kind: 'X', detail: 'x.com/studiobakers', url: 'https://x.com/studiobakers' },
        { name: 'danbillson', kind: 'X', detail: 'x.com/danbillson', url: 'https://x.com/danbillson' },
        { name: 'Aleo', kind: 'YouTube', detail: 'youtube.com/@Aleo/videos', url: 'https://www.youtube.com/@Aleo/videos' },
        { name: 'ZakArts', kind: 'YouTube', detail: 'youtube.com/@ZakArts', url: 'https://www.youtube.com/@ZakArts' },
        { name: 'JacarYT', kind: 'X', detail: 'x.com/JacarYT', url: 'https://x.com/JacarYT' },
        { name: 'Lyrical Lemonade', kind: 'YouTube', detail: 'youtube.com/@lyricalemonade', url: 'https://www.youtube.com/@lyricalemonade' },
      ],
    },
    {
      title: 'Tech',
      links: [
        { name: 'JustMicrock', kind: 'X', detail: 'x.com/JustMicrock', url: 'https://x.com/JustMicrock' },
        { name: 'karpathy', kind: 'X', detail: 'x.com/karpathy', url: 'https://x.com/karpathy' },
        { name: 'kunchenguid', kind: 'X', detail: 'x.com/kunchenguid', url: 'https://x.com/kunchenguid' },
        { name: 'itnig', kind: 'YouTube', detail: 'youtube.com/@itnig', url: 'https://www.youtube.com/@itnig' },
        { name: 'Hacker News', kind: 'Website', detail: 'news.ycombinator.com', url: 'https://news.ycombinator.com/' },
        { name: 'poteto', kind: 'X', detail: 'x.com/poteto', url: 'https://x.com/poteto' },
      ],
    },
    {
      title: 'Music',
      links: [
        { name: 'My Timing Is Off', kind: 'Spotify', detail: 'Eels', url: 'https://open.spotify.com/track/08sD8mwoJ5hp881gyZitKG?si=bd14484812ea4f6f' },
        { name: 'Another Sunny Day', kind: 'Spotify', detail: 'Belle and Sebastian', url: 'https://open.spotify.com/track/73JnItJ3dofEssv5hWFHDs?si=cf94823d4ace41bd' },
        { name: 'Take on Me', kind: 'Spotify', detail: 'Anni B Sweet', url: 'https://open.spotify.com/track/4GkELkyI3VJstSugqnP39K?si=7befd20a518b4eb4' },
        { name: 'Deixa’m creure', kind: 'Spotify', detail: 'Mishima', url: 'https://open.spotify.com/track/0g5r3kbevAmbabaUeW6HHy?si=26ffb5f351d64089' },
        { name: 'Icebergs i gèisers', kind: 'Spotify', detail: 'Antònia Font', url: 'https://open.spotify.com/track/6kIUv4PiLENjIlJ4cEod9R?si=99ad6a08256042b4' },
        { name: 'Dins un Avió de Paper', kind: 'Spotify', detail: 'Joan Miquel Oliver', url: 'https://open.spotify.com/track/4PBQzIWGIat0ibKAINrUjd?si=fd778b593c7b4e23' },
        { name: 'A veure què en fem', kind: 'Spotify', detail: 'Manel', url: 'https://open.spotify.com/track/3iqKC0A6o5tUebVkRpu2hP?si=8c1e29d5cec1405e' },
        { name: 'Ode To The Mets', kind: 'Spotify', detail: 'The Strokes', url: 'https://open.spotify.com/track/1BLOVHYYlH4JUHQGcpt75R?si=a301d01e2f874765' },
        { name: 'Paradise', kind: 'Spotify', detail: 'Sade', url: 'https://open.spotify.com/track/4tReFKumS5bcFahdXDiM1b?si=6bcac3b5ed4b47c0' },
      ],
    },
  ],
  booksTitle: 'Books',
  books: [
    { title: 'Lateral Thinking', author: 'Edward de Bono' },
    { title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman' },
    { title: 'Misbehaving', author: 'Richard Thaler' },
    { title: 'The Truth About the Harry Quebert Affair', author: 'Joël Dicker' },
    { title: 'How to Win Friends and Influence People', author: 'Dale Carnegie' },
    { title: 'The Analyst', author: 'John Katzenbach' },
    { title: 'The Girl with the Dragon Tattoo', author: 'Stieg Larsson' },
  ],
}
