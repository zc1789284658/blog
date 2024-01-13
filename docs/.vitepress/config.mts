import { defineConfig } from "vitepress";
import { genSidebar } from "../../packages/sidebar";

// https://vitepress.dev/reference/site-config
export default async () => defineConfig({
  title: "JackZZ's blog",
  description: "JackZZ's blog",
  markdown: {
    lineNumbers: true,
  },
  head: [["link", { rel: "icon", href: "/favicon.svg" }]],
  cleanUrls: true,
  themeConfig: {
    logo: "/favicon.svg",
    search: {
      provider: "local",
    },
    outline: {
      level: [2, 3],
    },
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2023-present Jack ZZ",
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "About", link: "/about" },
      {
        text: "Links", items: [
          { text: "MDN", link: "https://developer.mozilla.org/zh-CN/" },
          { text: "TsPlay", link: "https://www.typescriptlang.org/play" },
          { text: "TypeHero", link: "https://typehero.dev" },
          { text: "VSCMarket", link: "https://marketplace.visualstudio.com/" },
          { text: "ProxyPattern", link: "https://www.patterns.dev" },
          { text: "Netlify", link: "https://app.netlify.com" },
          { text: "Vercel", link: "https://vercel.com/zhoucheng" },
          { text: "Wiki", link: "https://en.wikipedia.org/" },
        ]
      }
    ],
    sidebar: genSidebar(),
    socialLinks: [
      { icon: "github", link: "https://github.com/zc1789284658/" },
      { icon: "linkedin", link: "https://www.linkedin.com/in/zhoucheng0431" },
      {
        icon: {
          svg: '<svg aria-label="Vercel Logo" fill="var(--geist-foreground)" viewBox="0 0 75 65" height="26" data-testid="dashboard/logo"><path d="M37.59.25l36.95 64H.64l36.95-64z"></path></svg>',
        },
        link: "https://vercel.com/zhoucheng",
        ariaLabel: "Vercel",
      },
    ],
  },
});
