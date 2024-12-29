import BaseData from './base';
import { getSkills } from './skills';
import type { Skill } from './types';

const title = 'Home';

const hero: {
	title: string;
	description: string;
	links: Array<{ label: string; href: string; icon: `i-carbon-${string}` }>;
} = {
	title: `${BaseData.fullName}`,
	description:
		'Ready to take on anything.',
	links: [
		{ label: 'GitHub', href: 'https://github.com/milanwdewaele', icon: 'i-carbon-logo-github' },
		{ label: 'Instagram', href: 'https://instagram.com/milanwdewaele', icon: 'i-carbon-logo-instagram' },
		{ label: 'Email', href: 'mailto:hallo@milandewaele.be', icon: 'i-carbon-at' }
	]
};

const carousel: Array<Skill> = getSkills();

const HomeData = {
	title,
	hero,
	carousel
};

export default HomeData;
