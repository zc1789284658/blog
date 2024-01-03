---
title: vscode相关
date: 2019-06-25
tags: [vsc]
categories: [工具]
---
# vscode相关
## 1.安装VSCode时，未添加右键快速打开文件夹/文件的解决方案

<!--more-->

1. 方案1： 重新安装VSCode
2. 方案2（推荐）： <br>
    手动添加注册表,新建纯文本文件，复制以下内容，将所有的`D:\\Develop\\Microsoft VS Code`替换成`你的本地VSCODE安装目录`后，文件后缀修改成`.reg`，`双击一路确定`即可
    ```
    Windows Registry Editor Version 5.00

    [HKEY_CLASSES_ROOT\*\shell\VSCode]
    @="Open with Code"
    "Icon"="D:\\Develop\\Microsoft VS Code\\Code.exe"

    [HKEY_CLASSES_ROOT\*\shell\VSCode\command]
    @="\"D:\\Develop\\Microsoft VS Code\\Code.exe\" \"%1\""

    Windows Registry Editor Version 5.00

    [HKEY_CLASSES_ROOT\Directory\shell\VSCode]
    @="Open with Code"
    "Icon"="D:\\Develop\\Microsoft VS Code\\Code.exe"

    [HKEY_CLASSES_ROOT\Directory\shell\VSCode\command]
    @="\"D:\\Develop\\Microsoft VS Code\\Code.exe\" \"%V\""

    Windows Registry Editor Version 5.00

    [HKEY_CLASSES_ROOT\Directory\Background\shell\VSCode]
    @="Open with Code"
    "Icon"="D:\\Develop\\Microsoft VS Code\\Code.exe"

    [HKEY_CLASSES_ROOT\Directory\Background\shell\VSCode\command]
    @="\"D:\\Develop\\Microsoft VS Code\\Code.exe\" \"%V\""
    ```

## 2. 插件
- [TSLint]() + [ESLint]()
- [Vetur]()
- [open in browser]() + [Debugger for Chrome]()
- [Material Theme]() + [Atom One Dark Theme]() + [Highlight Line]()
- [Flutter]() +[Dart]()
- [Chinese(simplified)Language]()
- [Beautify]()
- [VSC Netease Music]()
- [markdown-preview-enhanced](https://shd101wyy.github.io/markdown-preview-enhanced/#/zh-cn/)

## 3. 添加代码片段（以markdown为例）
1. ctrl+p
2. 输入 >snippets
3. 选择配置用户代码片段
4. 输入markdown，在选项卡中，打开markdown.json
5. 输入想要的代码片段name-key-value，如下
    ```js
    {
        "span code": {
            "prefix": "span",
            "body": [
                "<span id='$1' />"
            ],
            "description": "锚点代码块"
        },
    }
    /**
    代码片段名字：span code
    代码片段key:span
    代码片段value:"<span id='$1' />"
    代码片段描述：锚点代码块
    /
    ```
6. 开启markdown文件智能提示
    1. ctrl+p
    2. 输入settings.json
    3. 建议在底部添加key-value
    ```json
    {
        <!-- 已有json -->
       "[markdown]": {
            "editor.quickSuggestions": true
        }
    }
    ```

