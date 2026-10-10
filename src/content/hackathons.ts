import claudeImpactLabDemo from '../assets/hackathons/claude-impact-lab/demo.avif'
import claudeImpactLabTalk from '../assets/hackathons/claude-impact-lab/talk.avif'
import claudeImpactLabTeam from '../assets/hackathons/claude-impact-lab/team.avif'
import dammPitch from '../assets/hackathons/damm-x-ehub/pitch.avif'
import dammWinners from '../assets/hackathons/damm-x-ehub/winners.avif'
import dammWork from '../assets/hackathons/damm-x-ehub/work.avif'
import interhackGroup from '../assets/hackathons/interhackbcn/group.avif'
import interhackPitch from '../assets/hackathons/interhackbcn/pitch.avif'
import interhackStage from '../assets/hackathons/interhackbcn/stage.avif'
import speakMoneyLogo from '../assets/hackathons/speakmoney/elevenlabs-logo.avif'
import speakMoneyOrb from '../assets/hackathons/speakmoney/orb.avif'
import speakMoneyTeam from '../assets/hackathons/speakmoney/team.avif'

type HackathonFact = {
  label: string
  value: string
}

type HackathonPhoto = {
  src: string
  alt: string
}

type Hackathon = {
  id: string
  title: string
  facts: HackathonFact[]
  paragraphs: string[]
  photos: HackathonPhoto[]
  squares: HackathonPhoto[]
}

export const hackathons: Hackathon[] = [
  {
    id: 'claude-impact-lab',
    title: 'Claude\nImpact Lab',
    facts: [
      { label: 'Location', value: 'Poblenou, Barcelona' },
      { label: 'Duration', value: '1 day' },
      { label: 'Role', value: '3D scenes, interface and transitions' },
      { label: 'Team', value: '4 people' },
      { label: 'Result', value: 'First place' },
    ],
    paragraphs: [
      'Claude Impact Lab is the Claude community’s hackathon for local governments and nonprofits. The Barcelona edition closed the Claude Community House week in September 2026. Our project was for people who have recently moved to Barcelona and do not yet know how to enter the local community. We built Next Stop Barcelona, a game where you meet Jordi, a fictional neighbour who shows you local spots around the city.',
      'Our MacBooks tried their best, but they could not render the scenes in real time, so we pre-rendered them in Unreal Engine. I created the first Unreal scene for the team to start from, and also built the game interface, including the menus, the dialogue, the spot choices and the transitions between scenes. I also got the chance to debate the future of AI with other participants and the Claude ambassadors.',
    ],
    photos: [
      { src: claudeImpactLabTeam, alt: 'Our team of four at Claude Impact Lab' },
      {
        src: claudeImpactLabDemo,
        alt: 'The team presents Next Stop Barcelona, with a scene on the screen',
      },
      { src: claudeImpactLabTalk, alt: 'Speakers on the terrace at Claude Impact Lab' },
    ],
    squares: [],
  },
  {
    id: 'interhackbcn',
    title: 'InterHackBCN',
    facts: [
      { label: 'Location', value: 'Barcelona' },
      { label: 'Duration', value: '36 hours' },
      { label: 'Role', value: 'Product design, 3D truck visualisation and API integration' },
      { label: 'Team', value: '4 people' },
      { label: 'Result', value: 'Third place' },
    ],
    paragraphs: [
      'This was my first hackathon. My team and I decided to sign up for InterHackBCN, the first inter-university hackathon in Barcelona, held in May 2026. We took the challenge from Damm, the company behind Estrella Damm. Damm runs about 200 trucks a day to bars, restaurants and supermarkets across Spain, and each truck carries a mix of bottle cases, cans and kegs.',
      'But deciding how many routes to run, which vehicles to use and how to load each truck was still mostly manual. We built a tool to view the existing routes and plan new ones from past days’ data. When you pick a day and click "Generate", it shows a map with the ordered stops, the customer list and a 3D view of the truck, pallet by pallet. I built the web interface with Felipe (check him out!)',
    ],
    photos: [
      { src: interhackStage, alt: 'Participants and organisers on stage at InterHackBCN' },
      { src: interhackPitch, alt: 'A pitch on stage at InterHackBCN' },
      { src: interhackGroup, alt: 'Group photo of all InterHackBCN participants' },
    ],
    squares: [],
  },
  {
    id: 'damm-x-ehub',
    title: 'Damm x eHub',
    facts: [
      { label: 'Location', value: 'Barcelona' },
      { label: 'Duration', value: '2 days' },
      { label: 'Role', value: 'Web interface' },
      { label: 'Team', value: '3 people' },
      { label: 'Result', value: 'First place' },
    ],
    paragraphs: [
      'Damm x eHub was a two-day hackathon in Barcelona in May 2026, with real challenges from Damm, Cala.ai and Opereit. We took Damm’s procurement challenge, which was to help its procurement team decide when to buy aluminium, PET, energy and barley. Buyers needed a tool that help them predict prices, and more importantly, the reasons behind the claims.',
      'We built Calés, a multi-agent system. It combines weekly price history with market news and data from Cala.ai, and tells buyers to buy now, wait, hedge or keep watching. Each recommendation shows the forecast range, the confidence and the sources where models found the information. I designed the product (UI/UX) and the API integrations. Calés won the overall prize of the Hackathon.',
    ],
    photos: [
      {
        src: dammWinners,
        alt: 'The Calés team and the organisers with the Overall Winner sign',
      },
      { src: dammPitch, alt: 'Presenting the Calés dashboard to the jury' },
      { src: dammWork, alt: 'The team at work during Damm x eHub' },
    ],
    squares: [],
  },
  {
    id: 'speakmoney',
    title: 'SpeakMoney ElevenLabs',
    facts: [
      { label: 'Location', value: 'Barcelona' },
      { label: 'Duration', value: '1 day' },
      { label: 'Role', value: 'Presentation interface' },
      { label: 'Team', value: '4 people' },
      { label: 'Result', value: 'Second place' },
    ],
    paragraphs: [
      'In July 2026 we built a research tool for venture capital investors with Cala.ai data, a Barcelona startup that structures companies data (and much more!) for AI agents. You ask which startups are worth investing in, and an orchestrator agent decides how many research agents to start and what each one investigates.',
      'Each agent searches Cala.ai’s data and the news. At the end, the agents present their findings one after another, each with its own ElevenLabs voice and subtitles. I built that final presentation experience, integrated the ElevenLabs voice to the product and designed the list of reports.',
    ],
    photos: [{ src: speakMoneyTeam, alt: 'Our team of four in matching caps' }],
    squares: [
      { src: speakMoneyLogo, alt: 'ElevenLabs logo' },
      { src: speakMoneyOrb, alt: 'The orb of one of our research agents' },
    ],
  },
]
