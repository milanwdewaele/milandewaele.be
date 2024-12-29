import Assets from './assets';
import { getSkills } from './skills';
import { ContractType, type Experience, type Link } from './types';

const title = 'Experience';

const items: Array<Experience> = [
	{
		slug: 'harmony',
		company: 'Harmony Radio',
		description: 'A community radio station powered by AzuraCast.',
		contract: ContractType.SelfEmployed,
		type: 'Software Development',
		location: 'Home',
		period: { from: new Date('2021-01-13'), to: new Date('2023-08-23') },
		skills: getSkills('expressjs', 'js', "nodejs", "mdb", "css"),
		name: 'Head of Development & Founder',
		color: 'blue',
		links: [],
		logo: Assets.Unknown,
		shortDescription: 'My own community radio station.'
	},
	{
		slug: 'upbeat',
		company: 'UpBeat Radio',
		description: 'A community radio station powered by AzuraCast.',
		contract: ContractType.CommunityProject,
		type: 'Software Development',
		location: 'Home',
		period: { from: new Date('2023-08-23'), to: new Date('2023-12-21') },
		skills: getSkills('tailwind', "css"),
		name: 'UI & UX Developer',
		color: 'purple',
		links: [],
		logo: Assets.Unknown,
		shortDescription: 'A community radio station.'
	},
	{
		slug: 'findradios',
		company: 'FindRadios',
		description: 'Website to vote and checkout radios online.',
		contract: ContractType.CommunityProject,
		type: 'Software Development',
		location: 'Home',
		period: { from: new Date('2023-02-11'), to: new Date('2023-04-02') },
		skills: getSkills('tailwind', "css"),
		name: 'Developer',
		color: 'gray',
		links: [],
		logo: Assets.Unknown,
		shortDescription: 'Website to vote and checkout radios online.'
	},
];

const ExperienceData = { title, items };

export default ExperienceData;
