# Formwell

A dependency-free browser prototype for managing personal-training clients and their training plans.

## Included

- Trainer overview with client, session, plan, and message metrics
- Today's schedule and attention queue
- Searchable recent-client table
- Add-client dialog that updates the table immediately
- Responsive layout for desktop and mobile
- Navigation states for Overview, Clients, Training plans, and Messages

## Run

Open `index.html` in a browser. No build step or package installation is required.

## Publish a public link

This workspace includes a GitHub Pages workflow at `.github/workflows/deploy-pages.yml`.

1. Create a new GitHub repository.
2. Upload all files in this folder, including the `.github` folder, to the repository's `main` branch.
3. In GitHub, open **Settings > Pages** and set the source to **GitHub Actions**.
4. Wait for the workflow to finish under the **Actions** tab.

The public link will be `https://YOUR-USERNAME.github.io/REPOSITORY-NAME/`.

## Next implementation steps

Connect the interface to authentication, a persistent database, file uploads, and role-based permissions. The trainer should be able to manage client plans, while each client account should only be able to view its own training content.
