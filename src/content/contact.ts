type ContactLink = {
  name: string
  detail: string
  url: string
}

type ContactContent = {
  title: string
  description: string
  linksTitle: string
  links: ContactLink[]
}

export const contact: ContactContent = {
  title: 'Let’s\ntalk.',
  description: 'Have something in mind? Get in touch by email or find me online.',
  linksTitle: 'Get in touch',
  links: [
    { name: 'Email', detail: 'hello@marcvendrell.cat', url: 'mailto:hello@marcvendrell.cat' },
    { name: 'LinkedIn', detail: 'Marc Vendrell', url: 'https://www.linkedin.com/in/marc-vendrell-feliu/' },
  ],
}
