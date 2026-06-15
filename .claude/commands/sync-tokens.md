---
description: Pull SanMar design tokens from the Figma library and update src/styles/_tokens.scss
---

You are syncing the prototype's design tokens with the SanMar Figma design
system. Goal: rewrite `src/styles/_tokens.scss` so the prototype is on-brand.

Inputs:
- The Figma design-system file URL (ask the user if not provided as $ARGUMENTS).
  Accept a full figma.com/design/... URL or a fileKey.

Steps:
1. Confirm Figma access by calling the Figma MCP `whoami`. If it fails, tell the
   user to open the Figma desktop app, enter Dev Mode, and enable the MCP server.
2. From the file URL, extract the fileKey (and node-id if the user pointed at a
   specific tokens page/frame; convert "-" to ":" in node ids).
3. Call `get_variable_defs` for the file (scope to the tokens node if given) to
   read published color, typography, spacing, and radius variables. If the file
   has many variables, also call `get_metadata` first to find the right node.
4. Map the Figma variables onto the variables already defined in
   `src/styles/_tokens.scss`:
     - brand/semantic colors  -> the $sm-* color variables
     - font family + base size -> $sm-font-*
     - radius + spacing        -> $sm-radius*, $sm-spacer
   Preserve the existing variable NAMES and file structure — only replace the
   values. If Figma exposes tokens that have no matching variable yet, add new
   $sm-* variables in the right section and note them.
5. Update `src/styles/_theme.scss` ONLY if a new semantic color needs to map to
   a Bootstrap variable (e.g. a new brand color). Otherwise leave it untouched.
6. Remove any "PLACEHOLDER" comments for values you replaced with real data.
7. Summarize what changed: list each token, its old value, and its new value, so
   the designer can eyeball it. Do NOT run the dev server unless asked.

Important: do not invent values. Every token must come from the Figma file. If a
needed token isn't found in Figma, leave the existing value and flag it.
