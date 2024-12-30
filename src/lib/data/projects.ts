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
		logo: Assets.HarmonyAnim,
		name: 'Harmony: Version 2',
		period: {
			from: new Date("2022-11-03"),
			to: new Date("2023-10-20")
		},
		skills: getSkills('nodejs', 'expressjs', 'mdb', 'css', 'tailwind'),
		type: 'Radio player & platform',
		screenshots: [{ src: 'https://mdwnetcdn.s3.us-east-1.amazonaws.com/image.webp', label: "Song profile"}, { src: 'https://mdwnetcdn.s3.us-east-1.amazonaws.com/image-2.webp', label: "Homepage"}, { src: 'https://mdwnetcdn.s3.us-east-1.amazonaws.com/unknown.webp', label: "Article page"}, { src: 'https://mdwnetcdn.s3.us-east-1.amazonaws.com/unknown2.webp', label: "BETA homepage"}]
	},
	{
		slug: 'postit',
		color: 'yellow',
		description:
			"Social media concept based on Instagram's infinite scrolling feed. Supported text, images and video's.",
		shortDescription:
			"Social media concept based on Instagram's infinite scrolling feed.",
		links: [{ to: 'https://github.com/milanwdewaele/PostIt', label: 'GitHub' }, { to: 'http://postit.playground.milandewaele.be/', label: 'Website' }],
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
	{
		slug: 'gia',
		color: '#009EDF',
		description:
			"Page that makes use of the data.gent.stad API that randomly selects and displays street art, geolocating each piece and providing hyperlinks to additional information.",
		shortDescription:
			"Page that makes use of the data.gent.stad API.",
		links: [{ to: 'https://github.com/milanwdewaele/gentiskunst', label: 'GitHub' }, { to: 'http://gentiskunst.playground.milandewaele.be/', label: 'Website' }],
		logo: Assets.HTML,
		name: 'Gent is Art',
		period: {
			from: new Date("2024-09-04"),
			to: new Date("2024-09-04")
		},
		skills: getSkills('html', 'css', "js"),
		type: 'API testing',
		screenshots: [{ src: 'https://mdwnetcdn.s3.us-east-1.amazonaws.com/Screenshot_1.png', label: "Sample"}]
	},
];

const title = 'Projects';

const ProjectsData = { title, items };

export default ProjectsData;
