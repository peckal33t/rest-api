import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
	// Here be all your seeds 🌱

	// /**
	//  * Albums
	//  */
	// const moments = await prisma.album.upsert({
	// 	where: { id: 1 },
	// 	update: {},
	// 	create: { title: "Moments Album" }
	// });

	// const harmony = await prisma.album.upsert({
	// 	where: { id: 2 },
	// 	update: {},
	// 	create: { title: "Harmony Album" }
	// });

	// const oasis = await prisma.album.upsert({
	// 	where: { id: 3 },
	// 	update: {},
	// 	create: { title: "Oasis Album" }
	// });

	// const whispers = await prisma.album.upsert({
	// 	where: { id: 4 },
	// 	update: {},
	// 	create: { title: "Whispers Album" }
	// });

	// const cascade = await prisma.album.upsert({
	// 	where: { id: 5 },
	// 	update: {},
	// 	create: { title: "Cascade Album" }
	// });

	// const chill = await prisma.album.upsert({
	// 	where: { id: 6 },
	// 	update: {},
	// 	create: { title: "Chill Album" }
	// });

	// const horizon = await prisma.album.upsert({
	// 	where: { id: 7 },
	// 	update: {},
	// 	create: { title: "Horizon Album" }
	// });

	// /**
	//  * Photos
	//  */
	// const memories = await prisma.photo.upsert({
	// 	where: { id: 1 },
	// 	update: {},
	// 	create: {
	// 		title: "My memories",
	// 		url: "https://unsplash.com/photos/a-pile-of-old-photos-and-postcards-sitting-on-top-of-each-other-P2aOvMMUJnY",
	// 		comment: "My pictures on top of eachother"
	// 	}
	// });

	// const sunrise = await prisma.photo.upsert({
	// 	where: { id: 2 },
	// 	update: {},
	// 	create: {
	// 		title: "Sunrise",
	// 		url: "https://unsplash.com/photos/brown-boat-near-dock-qkfxBc2NQ18",
	// 		comment: "Sunrise near dock"
	// 	}
	// });

	// const palm = await prisma.photo.upsert({
	// 	where: { id: 3 },
	// 	update: {},
	// 	create: {
	// 		title: "Palm tree",
	// 		url: "https://unsplash.com/photos/infinity-pool-in-front-coconut-tree-G9QPsPvw63g",
	// 		comment: "Palm tree near pool"
	// 	}
	// });

	// const camera = await prisma.photo.upsert({
	// 	where: { id: 4 },
	// 	update: {},
	// 	create: {
	// 		title: "My new camera",
	// 		url: "https://unsplash.com/photos/person-taking-selfie-using-nikon-dslr-camera-FKyHyNowp-4"
	// 	}
	// });

	// const fireworks = await prisma.photo.upsert({
	// 	where: { id: 5 },
	// 	update: {},
	// 	create: {
	// 		title: "Large fireworks",
	// 		url: "https://unsplash.com/photos/a-large-fireworks-display-with-a-castle-in-the-background-1YOYbiW1NN0"
	// 	}
	// });

	// const castle = await prisma.photo.upsert({
	// 	where: { id: 6 },
	// 	update: {},
	// 	create: {
	// 		title: "Castle",
	// 		url: "https://unsplash.com/photos/gray-concrete-castle-on-hill-under-blue-sky-during-daytime-QS68fJ_hMjM",
	// 		comment: "Big castle on hill"
	// 	}
	// });

	// const road = await prisma.photo.upsert({
	// 	where: { id: 7 },
	// 	update: {},
	// 	create: {
	// 		title: "Straight road",
	// 		url: "https://unsplash.com/photos/gray-concrete-road-between-brown-and-green-leaf-trees-at-daytime-5hvn-2WW6rY",
	// 		comment: "Road between brown and green leafs"
	// 	}
	// });
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
