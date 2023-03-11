export type GithubFileType = 'file' | 'dir'
export interface Languages {
  name: string
  downloadUrl: string
}

export interface GithubApiResponse {
  name: string
  path: string
  sha: string
  size: number
  url: string
  html_url: string
  git_url: string
  download_url: null
  type: GithubFileType
}
