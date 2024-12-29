import Assets from './assets';
import { getSkills } from './skills';
import type { Project } from './types';

const items: Array<Project> = [
	{
		slug: 'postit',
		color: '#ff3e00',
		description:
			"Social media concept based on Instagram's infinite scrolling feed. Supported text, images and video's.",
		shortDescription:
			"Social media concept based on Instagram's infinite scrolling feed.",
		links: [{ to: 'https://github.com/milanwdewaele/PostIt', label: 'GitHub' }],
		logo: Assets.Svelte,
		name: 'PostIt',
		period: {
			from: new Date("2022-11-03"),
			to: new Date("2024-10-20")
		},
		skills: getSkills('nodejs', 'expressjs', 'mdb', 'css'),
		type: 'Social platform',
		screenshots: []
	}
];

const title = 'Projects';

const ProjectsData = { title, items };

export default ProjectsData;
