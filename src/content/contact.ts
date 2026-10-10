type ContactEmail = {
  name: string
  address: string
}

type ContactProfile = {
  name: string
  detail: string
  url: string
}

type ContactContent = {
  title: string
  description: string
  linksTitle: string
  email: ContactEmail
  profiles: ContactProfile[]
}

export const contact: ContactContent = {
  title: 'Let’s\ntalk.',
  description: 'Have something in mind? Get in touch by email or find me online.',
  linksTitle: 'Get in touch',
  email: { name: 'Email', address: 'hello@marcvendrell.cat' },
  profiles: [
    { name: 'LinkedIn', detail: 'Marc Vendrell', url: 'https://www.linkedin.com/in/marc-vendrell-feliu/' },
  ],
}
