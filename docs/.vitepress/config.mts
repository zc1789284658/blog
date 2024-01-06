import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "JackZZ's blog",
  description: "A VitePress Site",
  markdown: {
    lineNumbers: true,
  },
  head: [["link", { rel: "icon", href: "/favicon.svg" }]],
  themeConfig: {
    search: {
      provider: "local",
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "About", link: "/about" },
      { text: "MDN", link: "https://developer.mozilla.org/zh-CN/" },
      { text: "TsPlay", link: "https://www.typescriptlang.org/play" },
    ],
    sidebar: [
      {
        text: "Quick start",
        collapsed: false,
        items: [{ text: "Brief", link: "/about" }],
      },
      {
        text: "Algorithm",
        collapsed: false,
        items: [{ text: "Let's go", link: "/algorithm/" }],
      },
      {
        text: "FrontEnd",
        collapsed: false,
        items: [
          {
            text: "FrameWork",
            collapsed: false,
            items: [
              {
                text: "react",
                collapsed: true,
                items: [
                  { text: "react18", link: "/react/react18" },

                  {
                    text: "Library",
                    items: [
                      {
                        text: "AntD",
                        link: "https://ant-design.antgroup.com/components/overview-cn/",
                      },
                    ],
                  },
                ],
              },
              {
                text: "vue",
                collapsed: true,
                items: [
                  { text: "vue2", link: "/vue/vue2/" },
                  { text: "vue3", link: "/vue/vue3/" },
                  {
                    text: "Library",
                    items: [{ text: "Quasar", link: "https://quasar.dev/" }],
                  },
                ],
              },
              {
                text: "Angular",
                collapsed: true,
                items: [{ text: "Angular17", link: "/angular/angular17" }],
              },
              {
                text: "flutter",
                link: "/flutter/",
              },
            ],
          },
        ],
      },
      {
        text: "Back End",
        collapsed: true,
        items: [{ text: "Nestjs", link: "https://nestjs.com/" }],
      },
      {
        text: "Package manager",
        collapsed: true,
        items: [
          {
            text: "pnpm",
            link: "https://pnpm.io/",
          },
        ],
      },
      {
        text: "Test",
        collapsed: true,
        items: [
          { text: "Jest", link: "https://jestjs.io/" },
          { text: "Playwright", link: "https://playwright.dev/docs/intro" },
          { text: "Puppeteer", link: "https://pptr.dev/" },
        ],
      },
      {
        text: "Bundler",
        collapsed: true,
        items: [
          {
            text: "webpack",
            items: [
              { text: "webpack4", link: "/webpack/webpack4" },
              { text: "webpack5", link: "/webpack/webpack5" },
            ],
          },
        ],
      },
      {
        text: "Performance",
        collapsed: true,
        items: [
          {
            text: "optimize",
            link: "/performance/optimize",
          },
          {
            text: "Lighthouse",
            link: "https://github.com/GoogleChrome/lighthouse",
          },
        ],
      },
      {
        text: "DesignPatterns",
        link: "/design-patterns/",
      },
    ],
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
