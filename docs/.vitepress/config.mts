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
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "About", link: "/about" },
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
              { text: "react", link: "/react/" },
              { text: "vue", link: "/vue/" },
            ],
          },
        ],
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
        ariaLabel: "Vercel"
      },
    ],
  },
});
