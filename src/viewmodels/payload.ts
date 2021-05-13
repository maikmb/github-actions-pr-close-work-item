export default class Payload {
  constructor() {
    this.action = ''
    this.number = -1
    this.url = ''
    this.title = ''
    this.merged = false
    this.repo_fullname = ''
    this.repo_name = ''
    this.repo_url = ''
    this.repo_owner = ''
    this.body = ''
    this.sender_login = ''
  }

  action: string
  number?: number
  url: string
  title: string
  merged: boolean
  repo_fullname: string
  repo_name: string
  repo_url: string
  repo_owner: string
  body: string
  sender_login: string

  getAzureWorkItemId(): string {
    if (!this.hasIntegrationTag())
      throw Error(
        'Azure work item not found. Add AB#{work_item_code} to pull request title'
      )
    const workItemId = this.title.replace(/[^0-9]/g, '')
    return workItemId
  }

  hasIntegrationTag(): boolean {
    return this.title.toUpperCase().includes('AB#')
  }
}
