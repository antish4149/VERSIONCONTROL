# Git Commit Best Practices & Cheat Sheet

This guide serves as a quick reference tool to maintain a clean, readable, and professional Git history.

---

## 📝 The 7 Rules of a Great Commit Message

1. **Use the imperative mood:** Write it like a command or instruction (*"Add feature"*, not *"Added feature"* or *"Adds feature"*).
2. **Capitalize the first letter:** Keep the subject line clean and professional.
3. **No period at the end:** The title acts as a header; do not end it with punctuation.
4. **Limit the title to 50 characters:** Keep it short, direct, and readable in git logs.
5. **Separate the body with a blank line:** If you need to explain context, leave a blank line after the title and write a detailed paragraph.
6. **Wrap the body at 72 characters:** This prevents your description from clipping or spilling over in standard terminal screens.
7. **Never commit broken code:** Ensure the codebase compiles and local tests pass completely before staging.

---

## 🛠️ Conventional Commits Cheat Sheet

**Structure:** `type(scope): imperative summary`

| Type | Description / When to use it | Quick Example |
| :--- | :--- | :--- |
| **`feat`** | Introducing a brand-new feature or functionality | `feat(repo): add delete endpoint` |
| **`fix`** | Patching a bug, resolving a crash, or correcting an error | `fix(model): rename file to fix typo` |
| **`docs`** | Documentation-only changes (README, wiki, comments) | `docs: update API documentation` |
| **`style`** | Code formatting, trailing whitespace, semicolons (no logic change) | `style: fix indentation in controller` |
| **`refactor`**| Rewriting code to improve it (no new features or bug fixes) | `refactor(auth): optimize SQL query` |
| **`test`** | Adding missing unit tests or correcting existing tests | `test(repo): add unit tests for CRUD` |
| **`chore`** | Updating build tasks, dependencies, package manager configs | `chore: npm upgrade express` |

---

## 💡 The Ultimate "Imperative Mood" Test

If you are stuck on how to phrase your message, fill in the blank to complete this sentence:
> *"If applied, this commit will... **[your commit message]**"*

* ❌ *If applied, this commit will... **Implemented repo controller*** (Grammatically incorrect)
* ❌ *If applied, this commit will... **Fixing the model typo*** (Grammatically incorrect)
* ✅ *If applied, this commit will... **Implement repo controller*** (Perfect)
* ✅ *If applied, this commit will... **Fix model typo*** (Perfect)

---

## ⌨️ Essential Terminal Snippets

### Fix Your Last Commit Message
If your code is correct but your message has a typo or violates standards, overwrite it immediately:
```bash
git commit --amend -m "type(scope): new correct message here"
```

### Safely Rename Filename Casing (Windows/macOS)
Avoid editing filenames directly in your editor for case-only changes (e.g., `repomode` to `repoModel`), as default file systems ignore this change:
```bash
git mv oldfilename newFileName
```

### Undo Your Absolute Last Commit
* **Path A (Keep your code changes staged):**
  ```bash
  git reset --soft HEAD~1
  ```
* **Path B (Completely wipe out the commit and your code modifications):**
  ```bash
  git reset --hard HEAD~1
  ```
