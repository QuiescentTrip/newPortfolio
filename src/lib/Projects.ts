export type Project = {
	title: string;
	technologies: string[];
	description: string;
	url: string;
	image?: string;
};

type ProjectsCollection = {
	important: Project[];
	unimportant: Project[];
};

const projects: ProjectsCollection = {
	important: [
		{
			title: 'Sifi',
			technologies: ['React', 'GLP'],
			description: 'Sifi Website',
			url: 'https://dev.sifi.no',
			image: './images/projects/sifi.png'
		},
		{
			title: 'BuddyUp',
			technologies: ['SvelteKit', 'Capacitor', 'Pocketbase', 'SkeletonUI', 'KonstaUI'],
			description: 'App where people can find or create activities near them',
			url: 'https://www.buddyup.fabiantangen.no/',
			image: './images/projects/buddyup.jpeg'
		},
		{
			title: 'Oslomate',
			technologies: ['SvelteKit', 'Pocketbase', 'SkeletonUI'],
			description: 'Website where Oslomet students can rate their subject',
			url: 'https://www.oslomate.no/',
			image: './images/projects/oslomate.jpeg'
		},
		{
			title: 'Mell0',
			technologies: ['GDScript', 'Godot', 'Blender', 'FL'],
			description: 'Mell0 is a game I made for the 2023 Autumn Tavern GameJam',
			url: 'https://temolantern.itch.io/mell0',
			image: './images/projects/mell0.jpeg'
		},
		{
			title: 'Cellseg',
			technologies: ['Electron', 'SvelteKit'],
			description: 'Tool for segmenting cells in images',
			url: 'https://cellseg.fabiantangen.no/',
			image: './images/projects/cellseg.png'
		}
	],
	unimportant: [
		{
			title: 'Quiescent',
			technologies: ['SvelteKit'],
			description: 'My personal personal website. My place on the indie web',
			url: 'https://quiescent.net',
			image: './images/projects/quie.png'
		},
		{
			title: 'Rock Paper Scissors',
			technologies: ['SvelteKit'],
			description: 'Rock Paper Scissors game I made for a friend, probably one of the first projects I made.',
			url: 'https://ssp.fabiantangen.no',
			image: './images/projects/ssp.png'
		},
		{
			title: 'Dats-2300',
			technologies: ['Javascript', 'GPT-API'],
			description:
				'Simple chrome extension that uses GTP3.5 Turbo to add better function and variable names to our Dats-2300 book',
			url: 'https://github.com/QuiescentTrip/Dats-2300-Extension',
			image: './images/projects/dats.jpeg'
		},
		{
			title: 'This website',
			technologies: ['SvelteKit', 'SkeletonUI'],
			description: 'Will be regularly changed. Does host a blog as well, but it is not updated regularly.',
			url: 'https://www.fabiantangen.no/',
			image: './images/projects/this.png'
		},
		{
			title: 'Poxi.io',
			technologies: ['SvelteKit', '& Lots more'],
			description: 'A social media platform with websites created by Filip, where I helped',
			url: 'https://poxi.page/',
			image: './images/projects/poxi.jpeg'
		},
		{
			title: 'Stem fabian',
			technologies: ['React', 'NextJS'],
			description: "Website I made to get accepted as sifi's web associate",
			url: 'https://stem.fabiantangen.no',
			image: './images/projects/stem.png'
		},
		{
			title: 'SVG Color Perms',
			technologies: ['SvelteKit'],
			description: 'Website I made to calculate the permutations of colors from an SVG file.',
			url: 'https://svg-perm.fabiantangen.no',
			image: './images/projects/perm.png'
		},
		{
			title: 'Instagram Clone',
			technologies: ['React', 'NextJS', 'ASP.NET', 'ShadCN', 'SQLite'],
			description: 'Instagram clone, where frontend and backend was written from scratch',
			url: 'https://github.com/QuiescentTrip/webapp-social'
		},
		{
			title: '4 Presentation Night',
			technologies: ['Svelte', 'SvelteKBC'],
			description: 'Fun presentation Website I made in a day for Presentation Night',
			url: 'https://www.presentationnight.lol/'
		},
		{
			title: 'Repo Transfer Script',
			technologies: ['Python', 'GitHub-Rest-API'],
			description:
				'Script that allows you to transfer all of you repos from one account into another.',
			url: 'https://github.com/s374907/transfer_script'
		},
		{
			title: 'Not sifi website',
			technologies: ['React', 'NextJS'],
			description: 'Made a mock website about sifi trying as a joke.',
			url: 'https://notsifi.no',
			image: './images/projects/notsifi.png'
		},
	]
};

export default projects;
