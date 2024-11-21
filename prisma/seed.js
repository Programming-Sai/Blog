const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const posts = [
  {
    slug: "lifestyle-tips-1",
    title: "Lifestyle Tips #1",
    catSlug: "lifestyle", // Make sure these match your Category slugs
    desc: "Discover how to improve your daily habits with these simple lifestyle tips.",
    views: 120,
  },
  {
    slug: "sports-news-2",
    title: "Sports News #2",
    catSlug: "sports",
    desc: "Catch up on the latest highlights and scores from the sports world.",
    views: 87,
  },
  {
    slug: "news-today-3",
    title: "News Today #3",
    catSlug: "news",
    desc: "Stay informed with breaking news from around the globe.",
    views: 230,
  },
  {
    slug: "top-music-trends-4",
    title: "Top Music Trends #4",
    catSlug: "music",
    desc: "Explore the latest trends in the music industry and what's topping the charts.",
    views: 340,
  },
  {
    slug: "blockbuster-movies-5",
    title: "Blockbuster Movies #5",
    catSlug: "movies",
    desc: "Check out the top movies dominating the box office this month.",
    views: 415,
  },
  {
    slug: "healthy-habits-6",
    title: "Healthy Habits #6",
    catSlug: "lifestyle",
    desc: "Learn how to maintain a healthy lifestyle with these easy habits.",
    views: 275,
  },
  {
    slug: "football-updates-7",
    title: "Football Updates #7",
    catSlug: "sports",
    desc: "Latest updates and scores from the football leagues worldwide.",
    views: 192,
  },
  {
    slug: "political-insights-8",
    title: "Political Insights #8",
    catSlug: "news",
    desc: "Analyze the most recent political events and their implications.",
    views: 150,
  },
  {
    slug: "emerging-artists-9",
    title: "Emerging Artists #9",
    catSlug: "music",
    desc: "Get to know the rising stars in the music scene this year.",
    views: 98,
  },
  {
    slug: "movie-releases-10",
    title: "Movie Releases #10",
    catSlug: "movies",
    desc: "A list of upcoming movie releases you don't want to miss.",
    views: 520,
  },
  {
    slug: "home-decor-ideas-11",
    title: "Home Decor Ideas #11",
    catSlug: "lifestyle",
    desc: "Transform your space with these trending home decor ideas.",
    views: 180,
  },
  {
    slug: "basketball-daily-12",
    title: "Basketball Daily #12",
    catSlug: "sports",
    desc: "Insights and updates from your favorite basketball leagues.",
    views: 255,
  },
  {
    slug: "tech-news-13",
    title: "Tech News #13",
    catSlug: "news",
    desc: "Stay updated on the latest innovations and tech breakthroughs.",
    views: 310,
  },
  {
    slug: "top-albums-14",
    title: "Top Albums #14",
    catSlug: "music",
    desc: "Discover the best albums released this year.",
    views: 405,
  },
  {
    slug: "film-awards-15",
    title: "Film Awards #15",
    catSlug: "movies",
    desc: "Highlights from the latest film awards and winning moments.",
    views: 365,
  },
  {
    slug: "wellness-guide-16",
    title: "Wellness Guide #16",
    catSlug: "lifestyle",
    desc: "A complete guide to mental and physical well-being.",
    views: 222,
  },
  {
    slug: "tennis-rankings-17",
    title: "Tennis Rankings #17",
    catSlug: "sports",
    desc: "An updated list of the top-ranked tennis players.",
    views: 145,
  },
  {
    slug: "daily-headlines-18",
    title: "Daily Headlines #18",
    catSlug: "news",
    desc: "Quickly catch up on the major headlines of the day.",
    views: 490,
  },
  {
    slug: "iconic-musicians-19",
    title: "Iconic Musicians #19",
    catSlug: "music",
    desc: "A look back at the most iconic musicians of the decade.",
    views: 330,
  },
  {
    slug: "indie-films-20",
    title: "Indie Films #20",
    catSlug: "movies",
    desc: "Discover some hidden gems in the indie film world.",
    views: 275,
  },
];
const categories = [
  { slug: "lifestyle", name: "Lifestyle" },
  { slug: "sports", name: "Sports" },
  { slug: "news", name: "News" },
  { slug: "music", name: "Music" },
  { slug: "movies", name: "Movies" },
];

async function main() {
  // Ensure that categories exist before seeding posts
  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {}, // If it exists, do nothing
      create: category, // If it doesn't exist, create it
    });
  }
  console.log("Categories upserted.");

  // Clear the posts table
  await prisma.post.deleteMany();
  console.log("Post table cleared.");

  // Seed the new posts
  for (const post of posts) {
    await prisma.post.create({
      data: {
        slug: post.slug,
        title: post.title,
        desc: post.desc,
        views: post.views,
        // Link post to category by catSlug
        cat: {
          connect: { slug: post.catSlug }, // This references the Category by its slug
        },
      },
    });
  }

  console.log("Dummy data seeded!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
