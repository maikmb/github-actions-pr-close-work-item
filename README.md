# Manage work item stage with pull request

Manage work item state when a pull request is closed or opened.

## Outputs
True for success update

## Example usage

1. Add a secret named `ADO_PERSONAL_ACCESS_TOKEN` containing an [Azure Personal Access Token](https://docs.microsoft.com/en-us/azure/devops/organizations/accounts/use-personal-access-tokens-to-authenticate) with "read & write" permission for Work Items

2. Add an optional secret named `GH_PERSONAL_ACCESS_TOKEN` containing a [GitHub Personal Access Token](https://help.github.com/en/enterprise/2.17/user/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line) with "repo" permissions. See optional information below.

3. Install the [Azure Boards App](https://github.com/marketplace/azure-boards) from the GitHub Marketplace

4. Add a workflow file which responds to pull request events of `opened, closed`

   - Set Azure DevOps organization and project details.
   - Set specific work item type settings (work item type, new state, active state, closed state)
   - Set state that work item must be set:
    
    `ado_on_close_state`: State name that the PR will get set too after it is closed

    `ado_on_active_state`: State name that the PR will get set too after it is created

   Optional Env Variables

   - `github_token`: Used to update the Issue with AB# syntax to link the work item to the issue. This will only work if the project is configured to use the [GitHub Azure Boards](https://github.com/marketplace/azure-boards) app.

```yaml
name: Pull Request close work item

on:
  pull_request:
    types: [opened, closed]
    branches:
      - master

jobs:
  alert:
    runs-on: ubuntu-latest
    steps:
    - uses: maikmb/github-actions-pr-close-work-item@master
      env:
        ado_token: '${{ secrets.ADO_PERSONAL_ACCESS_TOKEN }}'   
        github_token: '${{ secrets.GH_TOKEN }}'    
        ado_organization: 'privatepreview'
        ado_project: 'Agile'
        ado_wit: 'Task'
        ado_on_close_state: 'Done'
        ado_on_active_state: 'Code Review'         
```
