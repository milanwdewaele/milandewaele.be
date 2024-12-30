import Assets from './assets';
import { getSkills } from './skills';
import type { Project } from './types';

const items: Array<Project> = [
	{
		slug: 'hv2',
		color: '#3632F9',
		description:
			"Radio player with profiles, shop, news and more.",
		shortDescription:
			"Radio player with profiles, shop, news and more.",
		links: [{ to: 'https://weareharmony.net/app/', label: 'Website (unreachable)' }],
		logo: Assets.Harmony,
		name: 'Harmony: Version 2',
		period: {
			from: new Date("2022-11-03"),
			to: new Date("2023-10-20")
		},
		skills: getSkills('nodejs', 'expressjs', 'mdb', 'css', 'tailwind'),
		type: 'Radio player & platform',
		screenshots: [{ src: 'https://mdwnetcdn.s3.us-east-1.amazonaws.com/image.webp', label: "Image"}, { src: 'https://mdwnetcdn.s3.us-east-1.amazonaws.com/image-2.webp', label: "Image"}]
	},
	{
		slug: 'postit',
		color: '#fffff',
		description:
			"Social media concept based on Instagram's infinite scrolling feed. Supported text, images and video's.",
		shortDescription:
			"Social media concept based on Instagram's infinite scrolling feed.",
		links: [{ to: 'https://github.com/milanwdewaele/PostIt', label: 'GitHub' }],
		logo: Assets.ExpressJs,
		name: 'PostIt',
		period: {
			from: new Date("2022-11-03"),
			to: new Date("2023-10-20")
		},
		skills: getSkills('nodejs', 'expressjs', 'mdb', 'css'),
		type: 'Social platform',
		screenshots: []
	},
];

const title = 'Projects';

const ProjectsData = { title, items };

export default ProjectsData;
