import { defineConfig, DefaultTheme } from "vitepress";
import fg from "fast-glob";
import { TextUtil } from "../packages/txt";

/**
 * generate sidebars by doc folders
 */
export const genSidebar = (DOCS_PATH = "./docs") => {
    const docPaths = fg.sync(`${DOCS_PATH}/**/*.md`);

    const sidebarMap = docPaths
        .reduce((_sidebarMap, _path) => {
            const paths = new TextUtil(_path).replacePrefix(DOCS_PATH).splitBy("/");

            paths.reduce((parentPath, dirOrFileName) => {
                const currentPath = `${parentPath}/${dirOrFileName}`;
                let current = _sidebarMap.get(currentPath);

                if (!current) {
                    current = {
                        text: currentPath,
                    } as DefaultTheme.SidebarItem;

                    _sidebarMap.set(currentPath, current);
                }

                const parent = parentPath && (_sidebarMap.get(parentPath) ?? "");

                if (parent) {
                    parent.collapsed = true;
                    if (!parent.items) parent.items = [];

                    if (!parent.items.some((_) => _.text === current!.text)) {
                        parent.items.push(current);
                    }
                }

                // means this is file
                if (dirOrFileName.endsWith(".md")) {
                    current.link = `${parentPath}/${dirOrFileName}`;
                }
                return currentPath;
            }, "");

            return _sidebarMap;
        }, new Map<string, DefaultTheme.SidebarItem>())
        .entries();

    const sidebar: DefaultTheme.SidebarItem[] = [];

    for (const [fullPath, sidebarItem] of sidebarMap) {
        sidebarItem.text = new TextUtil(sidebarItem.text)
            .replace(/-/g, " ")
            .getTxtBehindLastSlash()
            .replace(/\.md$/, "")
            .toCamel()

        if (fullPath.match(/\//g)?.length === 1 && (!fullPath.endsWith('.md'))) {
            sidebar.push(sidebarItem);
        }

    }

    return sidebar.sort((a,b)=> a.text?.localeCompare(b.text) );
};

