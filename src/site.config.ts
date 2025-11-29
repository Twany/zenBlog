import { withBase } from "./utils/helpers";
import { localizePath } from "./i18n/utils";
import { defaultLang, type Lang } from "./i18n/config";

export type Image = {
    src: string;
    alt?: string;
    caption?: string;
};

export type Link = {
    id?: string;
    text: string;
    href: string;
};

export type Hero = {
    eyebrowText?: string;
    title?: string;
    text?: string;
    image?: Image;
    actions?: Link[];
};

export type About = {
    title?: string;
    text?: string;
};

export type Blog = {
    title?: string;
    description?: string;
    taggedLabel?: string;
    backToListLabel?: string;
    nextPostLabel?: string;
    readPostLabel?: string;
};

export type ContactInfo = {
    title?: string;
    text?: string;
    socialLabel?: string;
    email?: {
        text?: string;
        href?: string;
        email?: string;
    };
    socialProfiles?: {
        text?: string;
        href?: string;
    }[];
};

export type Subscribe = {
    title?: string;
    text?: string;
    formUrl: string;
    emailLabel?: string;
    emailPlaceholder?: string;
    buttonText?: string;
};

export type Home = {
    recentPostsTitle?: string;
    viewAllPostsCta?: string;
};

export type TagsCopy = {
    title?: string;
    description?: string;
    postsSuffix?: string;
};

export type NotFoundCopy = {
    title?: string;
    description?: string;
    cta?: Link;
};

export type SiteConfig = {
    website: string;
    logo?: Image;
    title: string;
    description: string;
    image?: Image;
    headerNavLinks?: Link[];
    footerNavLinks?: Link[];
    socialLinks?: Link[];
    hero?: Hero;
    about?: About;
    contactInfo?: ContactInfo;
    subscribe?: Subscribe;
    blog?: Blog;
    tags?: TagsCopy;
    home?: Home;
    notFound?: NotFoundCopy;
    postsPerPage?: number;
    recentPostLimit: number;
    projectsPerPage?: number;
};

const buildLink = (path: string, lang: Lang) => withBase(localizePath(path, lang));

const siteConfigs: Record<Lang, SiteConfig> = {
    en: {
        website: "https://example.com",
        title: "Space Ahead",
        description: "A minimal space-inspired personal blog template built with Astro.js and Tailwind CSS, by Siddhesh Thadeshwar",
        image: {
            src: "/space-ahead-preview.jpeg",
            alt: "Space Ahead ✨ - A minimal space-inspired personal blog template, created by Siddhesh Thadeshwar.",
        },
        headerNavLinks: [
            { id: "home", text: "Home", href: buildLink("/", "en") },
            { id: "blog", text: "Blog", href: buildLink("/blog", "en") },
            { id: "tags", text: "Tags", href: buildLink("/tags", "en") },
            { id: "about", text: "About", href: buildLink("/about", "en") },
            { id: "contact", text: "Contact", href: buildLink("/contact", "en") },
        ],
        footerNavLinks: [
            { id: "about", text: "About", href: buildLink("/about", "en") },
            { id: "contact", text: "Contact", href: buildLink("/contact", "en") },
            { id: "rss", text: "RSS Feed", href: withBase("/rss.xml") },
            { id: "sitemap", text: "Sitemap", href: withBase("/sitemap-index.xml") },
        ],
        socialLinks: [
            { text: "Dribbble", href: "https://dribbble.com/" },
            { text: "Instagram", href: "https://instagram.com/" },
            { text: "X/Twitter", href: "https://twitter.com/" },
        ],
        hero: {
            eyebrowText: "Galaxy of Adventures",
            title: "Space Ahead ✨",
            text: "Written by Astro-naut Sid, a space explorer at Beyond Earth.",
            image: {
                src: "/assets/images/pixeltrue-space-discovery.svg",
                alt: "A person sitting at a desk in front of a computer",
            },
            actions: [
                { id: "blog", text: "Read Now", href: buildLink("/blog", "en") },
                { id: "subscribe", text: "Subscribe", href: "#subscribe" },
            ],
        },
        about: {
            title: "About",
            text: "Space Ahead is a blog about space exploration and travel. It is written by Astro-naut Sid, a space explorer at Beyond Earth. Sid is known for his love of adventure and his insatiable curiosity about the universe. He has explored countless planets, discovered new life forms, and made friends with aliens along the way. 🚀",
        },
        contactInfo: {
            title: "Contact",
            text: "Hi! Whether you have a question, a suggestion, or just want to share your thoughts, I'm all ears. Feel free to get in touch through any of the methods below:",
            socialLabel: "Social Profiles",
            email: {
                text: "Drop me an email and I’ll do my best to respond as soon as possible.",
                href: "mailto:example@example.com",
                email: "example@example.com",
            },
            socialProfiles: [
                { text: "LinkedIn", href: "https://www.linkedin.com/" },
                { text: "Peerlist", href: "https://www.peerlist.io/" },
                { text: "GitHub", href: "https://github.com/" },
            ],
        },
        subscribe: {
            title: "Subscribe to Space Ahead",
            text: "One update per week. All the latest stories in your inbox.",
            formUrl: "#",
            emailLabel: "Email Address",
            emailPlaceholder: "Your email",
            buttonText: "Subscribe",
        },
        blog: {
            title: "Blog",
            description: "Read about my space adventures, explorations and the aliens I've met on my journeys.",
            taggedLabel: "Tagged",
            backToListLabel: "Back to All Stories",
            nextPostLabel: "Next Post",
            readPostLabel: "Read Post",
        },
        tags: {
            title: "Tags",
            description: "Select a tag to view related posts.",
            postsSuffix: "posts",
        },
        home: {
            recentPostsTitle: "Recent Stories",
            viewAllPostsCta: "View All Posts",
        },
        notFound: {
            title: "Lost in space?",
            description: "The page you're looking for might have drifted into another galaxy.",
            cta: { id: "home", text: "Back to Home", href: buildLink("/", "en") },
        },
        postsPerPage: 2,
        recentPostLimit: 3,
    },
    zh: {
        website: "https://example.com",
        title: "太空前沿",
        description: "Space Ahead 是由 Siddhesh Thadeshwar 构建的极简太空主题 Astro.js + Tailwind CSS 博客模板。",
        image: {
            src: "/space-ahead-preview.jpeg",
            alt: "Space Ahead ✨ - 太空主题博客模板，由 Siddhesh Thadeshwar 创建。",
        },
        headerNavLinks: [
            { id: "home", text: "首页", href: buildLink("/", "zh") },
            { id: "blog", text: "博客", href: buildLink("/blog", "zh") },
            { id: "tags", text: "标签", href: buildLink("/tags", "zh") },
            { id: "about", text: "关于", href: buildLink("/about", "zh") },
            { id: "contact", text: "联系", href: buildLink("/contact", "zh") },
        ],
        footerNavLinks: [
            { id: "about", text: "关于", href: buildLink("/about", "zh") },
            { id: "contact", text: "联系", href: buildLink("/contact", "zh") },
            { id: "rss", text: "RSS 订阅", href: withBase("/rss.xml") },
            { id: "sitemap", text: "站点地图", href: withBase("/sitemap-index.xml") },
        ],
        socialLinks: [
            { text: "Dribbble", href: "https://dribbble.com/" },
            { text: "Instagram", href: "https://instagram.com/" },
            { text: "X/Twitter", href: "https://twitter.com/" },
        ],
        hero: {
            eyebrowText: "冒险银河",
            title: "太空前沿 ✨",
            text: "由超越地球的宇航员 Sid 撰写，记录一切星际故事。",
            image: {
                src: "/assets/images/pixeltrue-space-discovery.svg",
                alt: "坐在电脑前的宇航员",
            },
            actions: [
                { id: "blog", text: "立即阅读", href: buildLink("/blog", "zh") },
                { id: "subscribe", text: "订阅", href: "#subscribe" },
            ],
        },
        about: {
            title: "关于",
            text: "Space Ahead 是一个关于太空探索与旅行的博客，由宇航员 Sid 撰写。他热爱冒险，对宇宙充满好奇，探索过无数星球，结识新生命，也与外星朋友一路同行。🚀",
        },
        contactInfo: {
            title: "联系",
            text: "你好！无论你有问题、建议，还是想聊聊想法，都欢迎与我联系。",
            socialLabel: "社交账号",
            email: {
                text: "写封邮件给我，我会尽快回复。",
                href: "mailto:example@example.com",
                email: "example@example.com",
            },
            socialProfiles: [
                { text: "LinkedIn", href: "https://www.linkedin.com/" },
                { text: "Peerlist", href: "https://www.peerlist.io/" },
                { text: "GitHub", href: "https://github.com/" },
            ],
        },
        subscribe: {
            title: "订阅太空前沿",
            text: "每周一封，获取最新的太空故事。",
            formUrl: "#",
            emailLabel: "邮箱地址",
            emailPlaceholder: "你的邮箱",
            buttonText: "立即订阅",
        },
        blog: {
            title: "博客",
            description: "记录宇宙冒险、星际探索以及遇见的奇妙生命。",
            taggedLabel: "标签",
            backToListLabel: "返回全部文章",
            nextPostLabel: "下一篇",
            readPostLabel: "阅读全文",
        },
        tags: {
            title: "标签",
            description: "选择一个标签查看相关内容。",
            postsSuffix: "篇文章",
        },
        home: {
            recentPostsTitle: "最新故事",
            viewAllPostsCta: "查看全部文章",
        },
        notFound: {
            title: "迷失在宇宙？",
            description: "你查找的页面似乎飘向了另一片星域。",
            cta: { id: "home", text: "返回首页", href: buildLink("/", "zh") },
        },
        postsPerPage: 2,
        recentPostLimit: 3,
    },
};

export const getSiteConfig = (lang: Lang = defaultLang) => siteConfigs[lang];

export default getSiteConfig;
