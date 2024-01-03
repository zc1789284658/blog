import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "JackZZ's blog",
  description: "A VitePress Site",
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'About', link: '/about' },
    ],
    sidebar: [
      {
        text: 'Algorithm',
        collapsed: false,
        items: [
          { text: "Let's go", link: '/algorithm/' },
        ]
      },
      {
        text: 'FrontEnd',
        collapsed: false,
        items: [
          {
            text: 'FrameWork',
            collapsed: false,
            items: [
              { text: "react", link: "/react/" },
              { text: "vue", link: "/vue/" },
            ]
          },
        ]
      },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/zc1789284658/' },
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/zhoucheng0431' },
    ]
  },
})
