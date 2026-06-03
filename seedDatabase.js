
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || process.env.PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials. Ensure SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const categoriesList = [
  'General',
  '📂 Miscellaneous',
  '🤖 AI Video & Animation',
  '🎙️ AI Voice & Audio',
  '🎨 Design & UI/UX',
  '💻 Developer Tools & Hosting',
  '📈 SEO & Marketing',
  '✍️ Copywriting & Blogging',
  '🧠 Productivity & Mind Mapping',
  '🎬 Video Editing & Production',
  '📸 Image Generation & Editing',
  '📊 Data & Analytics',
  '🛠️ No-Code & Automation',
  '🚀 Startup & Founders',
  '📱 Social Media Management',
  '💼 Freelance & Business',
  '🎓 Learning & Courses'
];

const toolsData = [
  {
    "name": "Runway",
    "url": "https://runwayml.com",
    "description": "The pioneer in AI video generation and creative tools for professional visual storytellers.",
    "category": "🤖 AI Video & Animation"
  },
  {
    "name": "Pika",
    "url": "https://pika.art",
    "description": "An idea-to-video platform that sets your creativity in motion with stunning AI animations.",
    "category": "🤖 AI Video & Animation"
  },
  {
    "name": "HeyGen",
    "url": "https://heygen.com",
    "description": "Create professional business videos with realistic AI avatars and voice cloning in minutes.",
    "category": "🤖 AI Video & Animation"
  },
  {
    "name": "Synthesia",
    "url": "https://synthesia.io",
    "description": "The world's leading AI video generation platform used by thousands of enterprise teams.",
    "category": "🤖 AI Video & Animation"
  },
  {
    "name": "Luma AI",
    "url": "https://lumalabs.ai",
    "description": "Capture the world in lifelike 3D and generate cinematic, high-quality videos from text.",
    "category": "🤖 AI Video & Animation"
  },
  {
    "name": "Kaiber",
    "url": "https://kaiber.ai",
    "description": "An AI creative lab designed to transform your ideas into breathtaking animated videos.",
    "category": "🤖 AI Video & Animation"
  },
  {
    "name": "Tavus",
    "url": "https://tavus.ai",
    "description": "The most advanced AI video personalization platform for sales and marketing at scale.",
    "category": "🤖 AI Video & Animation"
  },
  {
    "name": "Leonardo AI Motion",
    "url": "https://leonardo.ai",
    "description": "Breathe life into static images with powerful AI-driven motion and animation features.",
    "category": "🤖 AI Video & Animation"
  },
  {
    "name": "ElevenLabs",
    "url": "https://elevenlabs.io",
    "description": "The most realistic, versatile, and high-fidelity AI speech and voice cloning software.",
    "category": "🎙️ AI Voice & Audio"
  },
  {
    "name": "Murf AI",
    "url": "https://murf.ai",
    "description": "Go from text to professional-quality voiceovers in minutes with studio-grade AI voices.",
    "category": "🎙️ AI Voice & Audio"
  },
  {
    "name": "Adobe Podcast",
    "url": "https://podcast.adobe.com",
    "description": "AI-powered audio recording and editing that makes your voice sound like it was recorded in a studio.",
    "category": "🎙️ AI Voice & Audio"
  },
  {
    "name": "Descript",
    "url": "https://descript.com",
    "description": "The only tool you need to write, record, transcribe, edit, and share your videos and podcasts.",
    "category": "🎙️ AI Voice & Audio"
  },
  {
    "name": "Udio",
    "url": "https://udio.com",
    "description": "Discover and create incredible music in any genre with the latest in generative AI audio.",
    "category": "🎙️ AI Voice & Audio"
  },
  {
    "name": "Suno",
    "url": "https://suno.com",
    "description": "Generate full songs with lyrics, melody, and vocals from just a simple text prompt.",
    "category": "🎙️ AI Voice & Audio"
  },
  {
    "name": "Resemble AI",
    "url": "https://resemble.ai",
    "description": "Create high-quality synthetic voices that capture the unique personality of your brand.",
    "category": "🎙️ AI Voice & Audio"
  },
  {
    "name": "Speechify",
    "url": "https://speechify.com",
    "description": "The leading AI text-to-speech reader that lets you listen to any book, document, or article.",
    "category": "🎙️ AI Voice & Audio"
  },
  {
    "name": "Figma",
    "url": "https://figma.com",
    "description": "The gold standard for collaborative interface design, prototyping, and design systems.",
    "category": "🎨 Design & UI/UX"
  },
  {
    "name": "Framer",
    "url": "https://framer.com",
    "description": "The best way to design and publish professional, high-performance websites without code.",
    "category": "🎨 Design & UI/UX"
  },
  {
    "name": "Spline",
    "url": "https://spline.design",
    "description": "A collaborative 3D design tool that makes it easy to create interactive web experiences.",
    "category": "🎨 Design & UI/UX"
  },
  {
    "name": "Linear",
    "url": "https://linear.app",
    "description": "The issue tracker of choice for high-performance teams who value speed and craft.",
    "category": "🎨 Design & UI/UX"
  },
  {
    "name": "Penpot",
    "url": "https://penpot.app",
    "description": "The first open-source design and prototyping platform that bridges the gap between designers and developers.",
    "category": "🎨 Design & UI/UX"
  },
  {
    "name": "Mobbin",
    "url": "https://mobbin.com",
    "description": "A massive library of real-world UI patterns from the world's most successful mobile and web apps.",
    "category": "🎨 Design & UI/UX"
  },
  {
    "name": "Subframe",
    "url": "https://subframe.com",
    "description": "Build production-ready React and Tailwind components visually in a designer-friendly canvas.",
    "category": "🎨 Design & UI/UX"
  },
  {
    "name": "Rive",
    "url": "https://rive.app",
    "description": "Create interactive, high-performance animations that work flawlessly across all platforms.",
    "category": "🎨 Design & UI/UX"
  },
  {
    "name": "Vercel",
    "url": "https://vercel.com",
    "description": "The frontend cloud for developers, providing the framework, workflows, and infrastructure to build a faster web.",
    "category": "💻 Developer Tools & Hosting"
  },
  {
    "name": "Supabase",
    "url": "https://supabase.com",
    "description": "Build production-grade applications with a complete open-source backend including database, auth, and storage.",
    "category": "💻 Developer Tools & Hosting"
  },
  {
    "name": "Resend",
    "url": "https://resend.com",
    "description": "The email API for developers that makes sending transactional and marketing emails a breeze.",
    "category": "💻 Developer Tools & Hosting"
  },
  {
    "name": "Railway",
    "url": "https://railway.app",
    "description": "A modern deployment platform that handles the complexity of infrastructure so you can focus on shipping.",
    "category": "💻 Developer Tools & Hosting"
  },
  {
    "name": "Neon",
    "url": "https://neon.tech",
    "description": "The serverless Postgres database built for modern developers who need to scale without the headache.",
    "category": "💻 Developer Tools & Hosting"
  },
  {
    "name": "Cursor",
    "url": "https://cursor.com",
    "description": "The AI-native code editor that deeply understands your codebase to help you write software faster.",
    "category": "💻 Developer Tools & Hosting"
  },
  {
    "name": "Warp",
    "url": "https://warp.dev",
    "description": "A modern, Rust-based terminal that brings AI, collaboration, and speed to your command line.",
    "category": "💻 Developer Tools & Hosting"
  },
  {
    "name": "Postman",
    "url": "https://postman.com",
    "description": "The comprehensive platform for API development that simplifies every step of the API lifecycle.",
    "category": "💻 Developer Tools & Hosting"
  },
  {
    "name": "Midjourney",
    "url": "https://midjourney.com",
    "description": "The industry leader in high-art AI image generation, pushing the boundaries of visual creativity.",
    "category": "📸 Image Generation & Editing"
  },
  {
    "name": "DALL-E 3",
    "url": "https://openai.com/dall-e-3",
    "description": "OpenAI's latest image generation model that understands nuanced instructions with incredible accuracy.",
    "category": "📸 Image Generation & Editing"
  },
  {
    "name": "Leonardo.ai",
    "url": "https://leonardo.ai",
    "description": "A powerful creative suite for generating high-quality production assets with fine-tuned AI models.",
    "category": "📸 Image Generation & Editing"
  },
  {
    "name": "Adobe Firefly",
    "url": "https://firefly.adobe.com",
    "description": "Commercial-safe generative AI built directly into the creative tools you already use every day.",
    "category": "📸 Image Generation & Editing"
  },
  {
    "name": "Magnific AI",
    "url": "https://magnific.ai",
    "description": "The world's most powerful AI image upscaler that adds stunning detail and clarity to any photo.",
    "category": "📸 Image Generation & Editing"
  },
  {
    "name": "Krea.ai",
    "url": "https://krea.ai",
    "description": "Real-time AI generation and creative tools that respond instantly as you sketch or prompt.",
    "category": "📸 Image Generation & Editing"
  },
  {
    "name": "Photoroom",
    "url": "https://photoroom.com",
    "description": "Create professional-grade product photos and backgrounds in seconds using advanced AI technology.",
    "category": "📸 Image Generation & Editing"
  },
  {
    "name": "Remove.bg",
    "url": "https://remove.bg",
    "description": "The fastest and most accurate way to automatically remove backgrounds from any image.",
    "category": "📸 Image Generation & Editing"
  },
  {
    "name": "Ahrefs",
    "url": "https://ahrefs.com",
    "description": "The ultimate SEO toolset for professionals to track keywords, analyze competitors, and grow traffic.",
    "category": "📈 SEO & Marketing"
  },
  {
    "name": "SEMrush",
    "url": "https://semrush.com",
    "description": "An all-in-one digital marketing platform covering SEO, PPC, social media, and content strategy.",
    "category": "📈 SEO & Marketing"
  },
  {
    "name": "Surfer SEO",
    "url": "https://surferseo.com",
    "description": "Boost your organic traffic with data-backed content optimization and SEO auditing tools.",
    "category": "📈 SEO & Marketing"
  },
  {
    "name": "SparkToro",
    "url": "https://sparktoro.com",
    "description": "Instantly discover what your target audience reads, watches, listens to, and follows online.",
    "category": "📈 SEO & Marketing"
  },
  {
    "name": "Perplexity",
    "url": "https://perplexity.ai",
    "description": "An AI-powered search engine that provides direct, cited answers to your most complex marketing questions.",
    "category": "📈 SEO & Marketing"
  },
  {
    "name": "Screaming Frog",
    "url": "https://screamingfrog.co.uk",
    "description": "The definitive website crawler for technical SEO audits used by experts worldwide.",
    "category": "📈 SEO & Marketing"
  },
  {
    "name": "AnswerThePublic",
    "url": "https://answerthepublic.com",
    "description": "Get instant insights into what people are searching for to create content that actually matters.",
    "category": "📈 SEO & Marketing"
  },
  {
    "name": "Jasper",
    "url": "https://jasper.ai",
    "description": "The AI marketing platform that helps enterprise teams create high-quality content at scale.",
    "category": "✍️ Copywriting & Blogging"
  },
  {
    "name": "Copy.ai",
    "url": "https://copy.ai",
    "description": "Automate your go-to-market workflows and create compelling copy for every channel.",
    "category": "✍️ Copywriting & Blogging"
  },
  {
    "name": "Grammarly",
    "url": "https://grammarly.com",
    "description": "The AI writing partner that helps you communicate with confidence and clarity everywhere you write.",
    "category": "✍️ Copywriting & Blogging"
  },
  {
    "name": "Beehiiv",
    "url": "https://beehiiv.com",
    "description": "The most powerful newsletter platform built specifically for growth and high-scale monetization.",
    "category": "✍️ Copywriting & Blogging"
  },
  {
    "name": "Substack",
    "url": "https://substack.com",
    "description": "The simplest way to start a paid newsletter and build a direct relationship with your readers.",
    "category": "✍️ Copywriting & Blogging"
  },
  {
    "name": "Lex",
    "url": "https://lex.page",
    "description": "An AI-first word processor designed to help you unlock your best thinking and write faster.",
    "category": "✍️ Copywriting & Blogging"
  },
  {
    "name": "Hemingway Editor",
    "url": "https://hemingwayapp.com",
    "description": "A distraction-free writing tool that helps you make your prose bold, clear, and easy to read.",
    "category": "✍️ Copywriting & Blogging"
  },
  {
    "name": "Notion",
    "url": "https://notion.so",
    "description": "The connected workspace where better, faster work happens through docs, wikis, and projects.",
    "category": "🧠 Productivity & Mind Mapping"
  },
  {
    "name": "Obsidian",
    "url": "https://obsidian.md",
    "description": "A private and flexible writing app that adapts to your way of thinking and building a second brain.",
    "category": "🧠 Productivity & Mind Mapping"
  },
  {
    "name": "Raycast",
    "url": "https://raycast.com",
    "description": "A supercharged Spotlight replacement for macOS that lets you control your tools with just a few keystrokes.",
    "category": "🧠 Productivity & Mind Mapping"
  },
  {
    "name": "Miro",
    "url": "https://miro.com",
    "description": "The leading visual collaboration platform where teams bring great ideas to life together.",
    "category": "🧠 Productivity & Mind Mapping"
  },
  {
    "name": "Whimsical",
    "url": "https://whimsical.com",
    "description": "A fast and intuitive workspace for creating flowcharts, wireframes, and collaborative mind maps.",
    "category": "🧠 Productivity & Mind Mapping"
  },
  {
    "name": "Todoist",
    "url": "https://todoist.com",
    "description": "The world's most popular task manager that helps you stay organized and focused on what's important.",
    "category": "🧠 Productivity & Mind Mapping"
  },
  {
    "name": "Arc Browser",
    "url": "https://arc.net",
    "description": "A revolutionary browser experience designed to help you organize your digital life and stay focused.",
    "category": "🧠 Productivity & Mind Mapping"
  },
  {
    "name": "CapCut",
    "url": "https://capcut.com",
    "description": "A versatile and easy-to-use video editor that makes professional-looking content accessible to everyone.",
    "category": "🎬 Video Editing & Production"
  },
  {
    "name": "DaVinci Resolve",
    "url": "https://blackmagicdesign.com",
    "description": "Professional-grade editing, color grading, and visual effects software used by Hollywood studios.",
    "category": "🎬 Video Editing & Production"
  },
  {
    "name": "Riverside.fm",
    "url": "https://riverside.fm",
    "description": "The platform of choice for recording high-fidelity remote podcasts and video interviews.",
    "category": "🎬 Video Editing & Production"
  },
  {
    "name": "Kapwing",
    "url": "https://kapwing.com",
    "description": "A modern, web-based video editor that makes collaborative content creation fast and painless.",
    "category": "🎬 Video Editing & Production"
  },
  {
    "name": "Screen Studio",
    "url": "https://screen.studio",
    "description": "Automatically turn your screen recordings into high-quality, professional videos for tutorials and demos.",
    "category": "🎬 Video Editing & Production"
  },
  {
    "name": "InVideo",
    "url": "https://invideo.io",
    "description": "Transform your scripts or ideas into engaging videos instantly with powerful AI templates.",
    "category": "🎬 Video Editing & Production"
  },
  {
    "name": "OpusClip",
    "url": "https://opus.pro",
    "description": "An AI-powered tool that automatically finds viral moments in long videos and turns them into shorts.",
    "category": "🎬 Video Editing & Production"
  },
  {
    "name": "Plausible",
    "url": "https://plausible.io",
    "description": "Lightweight and open-source web analytics that respect user privacy without compromising on insights.",
    "category": "📊 Data & Analytics"
  },
  {
    "name": "Fathom Analytics",
    "url": "https://usefathom.com",
    "description": "Simple, privacy-focused website analytics that are easy to use and fully GDPR compliant.",
    "category": "📊 Data & Analytics"
  },
  {
    "name": "Mixpanel",
    "url": "https://mixpanel.com",
    "description": "The powerful product analytics platform that helps teams understand how users interact with their apps.",
    "category": "📊 Data & Analytics"
  },
  {
    "name": "PostHog",
    "url": "https://posthog.com",
    "description": "The all-in-one suite of product tools including analytics, session recording, and feature flags.",
    "category": "📊 Data & Analytics"
  },
  {
    "name": "June",
    "url": "https://june.so",
    "description": "Product analytics for B2B SaaS teams that are ready to use out of the box with zero configuration.",
    "category": "📊 Data & Analytics"
  },
  {
    "name": "Amplitude",
    "url": "https://amplitude.com",
    "description": "The digital analytics platform that helps companies optimize the business value of their digital products.",
    "category": "📊 Data & Analytics"
  },
  {
    "name": "Baremetrics",
    "url": "https://baremetrics.com",
    "description": "Subscription analytics and insights that help you understand and grow your recurring revenue.",
    "category": "📊 Data & Analytics"
  },
  {
    "name": "Zapier",
    "url": "https://zapier.com",
    "description": "The industry standard for connecting apps and automating repetitive tasks without a single line of code.",
    "category": "🛠️ No-Code & Automation"
  },
  {
    "name": "Make",
    "url": "https://make.com",
    "description": "A powerful visual platform for building complex automations and connecting thousands of different apps.",
    "category": "🛠️ No-Code & Automation"
  },
  {
    "name": "Webflow",
    "url": "https://webflow.com",
    "description": "Build custom, professional websites with the power of code in a completely visual interface.",
    "category": "🛠️ No-Code & Automation"
  },
  {
    "name": "Bubble",
    "url": "https://bubble.io",
    "description": "The most flexible no-code platform for building fully functional web applications from scratch.",
    "category": "🛠️ No-Code & Automation"
  },
  {
    "name": "FlutterFlow",
    "url": "https://flutterflow.io",
    "description": "Build beautiful, high-performance native mobile apps visually using the power of Flutter.",
    "category": "🛠️ No-Code & Automation"
  },
  {
    "name": "Airtable",
    "url": "https://airtable.com",
    "description": "A flexible platform that combines the simplicity of a spreadsheet with the power of a database.",
    "category": "🛠️ No-Code & Automation"
  },
  {
    "name": "Tally",
    "url": "https://tally.so",
    "description": "The simplest and most elegant way to create forms and surveys for free, with a Notion-like interface.",
    "category": "🛠️ No-Code & Automation"
  },
  {
    "name": "Product Hunt",
    "url": "https://producthunt.com",
    "description": "The ultimate destination to discover the latest products in tech and launch your own to the world.",
    "category": "🚀 Startup & Founders"
  },
  {
    "name": "Indie Hackers",
    "url": "https://indiehackers.com",
    "description": "A community and platform where independent founders share their stories and help each other build profitable businesses.",
    "category": "🚀 Startup & Founders"
  },
  {
    "name": "Stripe",
    "url": "https://stripe.com",
    "description": "The essential financial infrastructure for modern internet businesses to accept payments and manage funds.",
    "category": "🚀 Startup & Founders"
  },
  {
    "name": "Gumroad",
    "url": "https://gumroad.com",
    "description": "The easiest way for creators to sell digital products and build a business directly with their fans.",
    "category": "🚀 Startup & Founders"
  },
  {
    "name": "Lemon Squeezy",
    "url": "https://lemonsqueezy.com",
    "description": "The all-in-one platform for payments, tax, and subscriptions designed specifically for SaaS founders.",
    "category": "🚀 Startup & Founders"
  },
  {
    "name": "ChartMogul",
    "url": "https://chartmogul.com",
    "description": "Powerful subscription analytics that help you track, analyze, and grow your SaaS recurring revenue.",
    "category": "🚀 Startup & Founders"
  },
  {
    "name": "First Round Review",
    "url": "https://review.firstround.com",
    "description": "Deeply tactical advice and long-form articles from the world's most successful startup leaders.",
    "category": "🚀 Startup & Founders"
  },
  {
    "name": "Buffer",
    "url": "https://buffer.com",
    "description": "A simple and intuitive way to schedule social media posts and analyze their performance across all channels.",
    "category": "📱 Social Media Management"
  },
  {
    "name": "Hypefury",
    "url": "https://hypefury.com",
    "description": "The personal assistant that helps you grow and monetize your Twitter presence with automated scheduling.",
    "category": "📱 Social Media Management"
  },
  {
    "name": "Taplio",
    "url": "https://taplio.com",
    "description": "The comprehensive platform to grow your personal brand and generate leads on LinkedIn using AI.",
    "category": "📱 Social Media Management"
  },
  {
    "name": "FeedHive",
    "url": "https://feedhive.com",
    "description": "An AI-powered social media scheduler that helps you maximize engagement and reach.",
    "category": "📱 Social Media Management"
  },
  {
    "name": "Typefully",
    "url": "https://typefully.com",
    "description": "The most beautiful tool to write, schedule, and analyze your tweets, threads, and LinkedIn posts.",
    "category": "📱 Social Media Management"
  },
  {
    "name": "Later",
    "url": "https://later.com",
    "description": "The leading social media marketing platform designed specifically for visual storytelling and scheduling.",
    "category": "📱 Social Media Management"
  },
  {
    "name": "Brandbird",
    "url": "https://brandbird.app",
    "description": "Create stunning, branded screenshots and graphics for your social media posts in seconds.",
    "category": "📱 Social Media Management"
  },
  {
    "name": "Contra",
    "url": "https://contra.com",
    "description": "The commission-free professional network designed specifically for the new era of independent work.",
    "category": "💼 Freelance & Business"
  },
  {
    "name": "Polywork",
    "url": "https://polywork.com",
    "description": "A professional network that helps you discover and collaborate on side projects and career opportunities.",
    "category": "💼 Freelance & Business"
  },
  {
    "name": "Read.cv",
    "url": "https://read.cv",
    "description": "A professional profile and network that prioritizes beautiful design and creative storytelling.",
    "category": "💼 Freelance & Business"
  },
  {
    "name": "Bonsai",
    "url": "https://hellobonsai.com",
    "description": "The all-in-one business management platform that helps freelancers automate their entire workflow.",
    "category": "💼 Freelance & Business"
  },
  {
    "name": "HoneyBook",
    "url": "https://honeybook.com",
    "description": "The client management software of choice for independent professionals to manage projects and payments.",
    "category": "💼 Freelance & Business"
  },
  {
    "name": "Deel",
    "url": "https://deel.com",
    "description": "The global hiring platform that simplifies payroll, compliance, and taxes for remote teams worldwide.",
    "category": "💼 Freelance & Business"
  },
  {
    "name": "Wise",
    "url": "https://wise.com",
    "description": "The fastest and most cost-effective way to send and receive international business payments.",
    "category": "💼 Freelance & Business"
  },
  {
    "name": "Maven",
    "url": "https://maven.com",
    "description": "The premier platform for high-impact cohort-based courses taught by industry experts.",
    "category": "🎓 Learning & Courses"
  },
  {
    "name": "Teachable",
    "url": "https://teachable.com",
    "description": "The easy-to-use platform that empowers creators to build and sell their own online courses and coaching.",
    "category": "🎓 Learning & Courses"
  },
  {
    "name": "Podia",
    "url": "https://podia.com",
    "description": "The all-in-one platform for selling digital products, courses, and memberships in one place.",
    "category": "🎓 Learning & Courses"
  },
  {
    "name": "Refactoring UI",
    "url": "https://refactoringui.com",
    "description": "The definitive guide to learning user interface design through practical, developer-friendly tactics.",
    "category": "🎓 Learning & Courses"
  },
  {
    "name": "Wes Bos",
    "url": "https://wesbos.com",
    "description": "Professional web development courses that are as fun to watch as they are educational.",
    "category": "🎓 Learning & Courses"
  },
  {
    "name": "Coursera",
    "url": "https://coursera.org",
    "description": "Access world-class education with online courses and degrees from top-tier universities worldwide.",
    "category": "🎓 Learning & Courses"
  },
  {
    "name": "Udemy",
    "url": "https://udemy.com",
    "description": "The largest marketplace for online learning, offering thousands of courses on every topic imaginable.",
    "category": "🎓 Learning & Courses"
  }
];

async function seed() {
  console.log('🚀 Starting seed process...');

  try {
    // 1. Populate Categories
    console.log('--- Step 1: Populating Categories ---');
    const { data: existingCatsData } = await supabase.from('categories').select('id, name');
    const existingNames = new Set(existingCatsData?.map(c => c.name) || []);
    
    const newCats = categoriesList.filter(name => !existingNames.has(name)).map(name => ({ name }));
    
    if (newCats.length > 0) {
      const { error: catError } = await supabase.from('categories').insert(newCats);
      if (catError) throw catError;
      console.log(`✅ Inserted ${newCats.length} new categories.`);
    } else {
      console.log('ℹ️ All categories already exist.');
    }

    // Fetch all categories (new + existing) to get their IDs
    const { data: allCategories, error: fetchError } = await supabase.from('categories').select('id, name');
    if (fetchError) throw fetchError;
    const categoryNameToId = Object.fromEntries(allCategories.map(c => [c.name, c.id]));

    // 2. Populate Tools Directory
    console.log('--- Step 2: Populating Tools Directory ---');
    
    // Filter out duplicates by URL in the input data
    const uniqueToolsMap = new Map();
    toolsData.forEach(tool => {
      uniqueToolsMap.set(tool.url, tool);
    });
    const uniqueTools = Array.from(uniqueToolsMap.values());

    const toolsToInsert = uniqueTools.map(tool => ({
      title: tool.name,
      url: tool.url,
      description: tool.description,
      favicon_url: `https://www.google.com/s2/favicons?domain=${new URL(tool.url).hostname}&sz=128`,
      category: tool.category,
      category_id: categoryNameToId[tool.category] || null,
      upvotes: Math.floor(Math.random() * (500 - 10 + 1)) + 10,
    }));

    const { data: insertedTools, error: toolsError } = await supabase
      .from('tools_directory')
      .upsert(toolsToInsert, { onConflict: 'url' });

    if (toolsError) throw toolsError;
    console.log(`✅ Successfully seeded ${toolsData.length} tools into the directory.`);

    console.log('✨ Seed process completed successfully!');
  } catch (err) {
    console.error('❌ Seed process failed:', err.message);
  }
}

seed();
