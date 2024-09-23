
# Pull Request Guidelines

## 1. Create a new branch for your work
- Always create a new branch from the main branch for any new feature, bug fix, or hotfix you are working on.
- Branch naming convention:
  - For features: `feature/feature-name`
  - For bug fixes: `bugfix/bug-description`
  - For hotfixes: `hotfix/hotfix-description`

### Examples:
- `feature/login-page`
- `bugfix/header-alignment`
- `hotfix/security-patch`

## 2. Write clear and descriptive commit messages
- Each commit message should explain **why** the change was made, not just **what** was changed.
- Commit message format:

  `[Type] Description of the change`

  `[Type]` can be:
  - **Add**: For adding a new feature
  - **Fix**: For fixing a bug
  - **Update**: For modifying existing functionality
  - **Remove**: For removing code
  
### Example:

`Add user authentication functionality`

- Implemented login page
- Added backend validation for login credentials

## 3. Keep pull requests small and focused
- Focus each PR on a single feature or fix.
- Avoid combining unrelated tasks in a single pull request.

## 4. Update documentation and tests
- If your changes affect any documentation or tests, ensure they are updated as part of the PR.

## 5. Review your code before submitting
- Check for linting errors, unnecessary code, unused imports, unused declared variables, and commented outdated blocks before submitting the PR.

## 6. Tag the appropriate reviewer(s)
- Assign your PR to the appropriate team member for review, and add any relevant labels (e.g., feature, bugfix, hotfix).

## 7. Be responsive to feedback
- When reviewers leave feedback, address the comments in a timely manner.
- Push additional commits to the same branch to update the PR.
