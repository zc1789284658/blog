# Snippets

## 启用

如果某个语言没有开启Snippets，那么则无法使用，需要手动开启Snippets功能

```json
// settings.json
{
  "[markdown]": {
    "editor.quickSuggestions": {
      "comments": true,
      "strings": true,
      "other": "on"
    },
    "editor.acceptSuggestionOnEnter": "on"
  }
}
```

