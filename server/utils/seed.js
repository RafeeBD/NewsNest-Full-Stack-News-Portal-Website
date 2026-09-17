const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const News = require('../models/News');
const Comment = require('../models/Comment');

dotenv.config();

const seedData = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/newsnest';
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB for database seeding...');

    // Clear old data
    await User.deleteMany({});
    await News.deleteMany({});
    await Comment.deleteMany({});

    // Password hash
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash('password123', salt);

    // Create users
    const users = await User.create([
      {
        name: 'Elena Rostova',
        email: 'elena@newsnest.com',
        password,
        role: 'journalist',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
        bio: 'Senior Global Affairs & Climate Journalist at NewsNest.',
      },
      {
        name: 'Marcus Vance',
        email: 'marcus@newsnest.com',
        password,
        role: 'journalist',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
        bio: 'Lead Technology & Artificial Intelligence Correspondent.',
      },
      {
        name: 'Sophia Chen',
        email: 'sophia@newsnest.com',
        password,
        role: 'journalist',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
        bio: 'Financial Markets Analyst & Political Policy Columnist.',
      },
      {
        name: 'Demo Reader',
        email: 'user@newsnest.com',
        password,
        role: 'user',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        bio: 'Avid reader and discussion contributor on NewsNest.',
      },
    ]);

    console.log(`Created ${users.length} default users.`);

    // Create news articles
    const articlesData = [
      {
        title: 'Global Climate Accord Reaches Breakthrough Agreement on Clean Tech Transfer',
        excerpt: 'Delegates from 140 nations agree to speed up technology sharing and green infrastructure investment.',
        content: `In a historic late-night plenary session, representatives from over 140 countries reached a landmark consensus to accelerate global clean technology sharing and establish a multi-billion dollar green infrastructure development initiative.\n\nThe global accord addresses long-standing economic disparities in renewable adoption while committing major global economies to mandatory emission targets for 2030.\n\nEnvironmental scientists and economic experts hailed the agreement as a crucial turning point for international climate diplomacy. Major investments will begin funding solar, wind, and smart grid technology deployment in vulnerable regions starting early next year.`,
        category: 'World',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
        author: users[0]._id,
        authorName: users[0].name,
        authorAvatar: users[0].avatar,
        views: 1420,
        likes: 89,
        isFeatured: true,
        isTrending: true,
        tags: ['Climate', 'Environment', 'World', 'Energy'],
        readTime: '4 min read',
      },
      {
        title: 'Quantum Computing Chip Breaks Energy Efficiency Record in AI Simulations',
        excerpt: 'Tech researchers demonstrate unprecedented processing speed with 90% reduced power consumption.',
        content: `Engineers have unveiled a breakthrough quantum processor capable of running complex artificial intelligence neural networks at speeds 100 times faster than conventional silicon chips while using a fraction of the electricity.\n\nThe revolutionary architecture leverages superconducting qubits that remain stable at near room temperatures, potentially overcoming the biggest obstacle to commercial quantum deployment.\n\nIndustry leaders project commercial applications across medical diagnostic tools, financial risk modeling, and advanced material discovery within the next two years.`,
        category: 'Technology',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
        author: users[1]._id,
        authorName: users[1].name,
        authorAvatar: users[1].avatar,
        views: 980,
        likes: 64,
        isFeatured: true,
        isTrending: true,
        tags: ['Technology', 'AI', 'Quantum', 'Innovation'],
        readTime: '5 min read',
      },
      {
        title: 'Central Banks Announce Joint Framework for Cross-Border Digital Currency Payments',
        excerpt: 'A unified standard promises instant international transactions with negligible friction fees.',
        content: `Six major monetary institutions today published a unified regulatory and technological architecture for interoperable central bank digital currencies (CBDCs).\n\nThe framework aims to streamline global remittances, lower international trade settlement fees, and introduce real-time auditing capabilities for global financial institutions.\n\nFinancial markets reacted positively to the announcement, with tech indexes posting gains across European and Asian trading sessions.`,
        category: 'Business',
        image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80',
        author: users[2]._id,
        authorName: users[2].name,
        authorAvatar: users[2].avatar,
        views: 750,
        likes: 42,
        isFeatured: true,
        isTrending: false,
        tags: ['Finance', 'Business', 'Economy', 'CBDC'],
        readTime: '3 min read',
      },
      {
        title: 'Underdog Team Secures Thrilling Last-Second Championship Victory',
        excerpt: 'An unforgettable buzzer-beater seals a historic comeback trophy win before a roaring crowd of 80,000.',
        content: `In one of the most remarkable championship finals in sports history, underdog outfit Metro United rallied back from a 15-point deficit to secure the title with a spectacular last-second play.\n\nThe stadium erupted as captain David Miller delivered an extraordinary clutch performance in the final two minutes.\n\nAnalysts are calling this victory one of the greatest tactical comebacks of the decade.`,
        category: 'Sports',
        image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80',
        author: users[3]._id,
        authorName: users[3].name,
        authorAvatar: users[3].avatar,
        views: 2150,
        likes: 180,
        isFeatured: true,
        isTrending: true,
        tags: ['Sports', 'Championship', 'Victory', 'Highlights'],
        readTime: '4 min read',
      },
      {
        title: 'Independent Film Festival Celebrates Next Generation of Visionary Directors',
        excerpt: 'Experimental storytelling and immersive cinematography shine at this year’s international cinema summit.',
        content: `This year's international film festival concluded with top honors awarded to indie filmmakers exploring themes of human connection, digital isolation, and resilience.\n\nThe Grand Jury prize was awarded to a captivating drama filmed entirely on medium-format cameras in rural Scandinavia.\n\nCritiques praised the festival for championing diverse voices and pushing cinematic boundaries beyond mainstream blockbusters.`,
        category: 'Entertainment',
        image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80',
        author: users[0]._id,
        authorName: users[0].name,
        authorAvatar: users[0].avatar,
        views: 640,
        likes: 38,
        isFeatured: true,
        isTrending: false,
        tags: ['Cinema', 'Entertainment', 'Film', 'Festival'],
        readTime: '3 min read',
      },
      {
        title: 'Parliamentary Summit Passes Bipartisan Transparency Bill on Public Infrastructure',
        excerpt: 'Legislators unite to establish real-time public access portals for all state project spendings.',
        content: `In a rare display of bipartisan collaboration, lawmakers voted overwhelmingly to pass landmark legislation enforcing complete transparency across public infrastructure procurement.\n\nThe new mandate requires all municipal and federal capital projects exceeding $5 million to maintain open-source financial ledgers accessible to citizens.\n\nCivic oversight organizations have commended the law as a benchmark for democratic accountability.`,
        category: 'Politics',
        image: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80',
        author: users[2]._id,
        authorName: users[2].name,
        authorAvatar: users[2].avatar,
        views: 890,
        likes: 55,
        isFeatured: true,
        isTrending: true,
        tags: ['Politics', 'Government', 'Policy', 'Reform'],
        readTime: '4 min read',
      },
    ];

    const newsDocs = await News.create(articlesData);
    console.log(`Created ${newsDocs.length} news articles.`);

    // Comments
    await Comment.create([
      {
        news: newsDocs[0]._id,
        user: users[3]._id,
        userName: users[3].name,
        userAvatar: users[3].avatar,
        content: 'This climate agreement is landmark news! Glad to see technology sharing taking priority.',
      },
      {
        news: newsDocs[1]._id,
        user: users[0]._id,
        userName: users[0].name,
        userAvatar: users[0].avatar,
        content: 'Quantum energy efficiency is going to reshape data center footprints worldwide.',
      },
    ]);

    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
