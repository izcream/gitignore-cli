import fs from 'fs'
import { GithubApiResponse, Languages } from './interface'

export async function gitIgnoreExists(): Promise<boolean> {
  return new Promise((resolve) => {
    fs.access('.gitignore', fs.constants.F_OK, (err) => {
      resolve(!err)
    })
  })
}

export async function getLanguages(): Promise<Languages[]> {
  const response = await fetch('https://api.github.com/repos/github/gitignore/contents')
  const data = (await response.json()) as GithubApiResponse[]
  return data
    .filter(({ type }) => type === 'file')
    .map((asset: any) => ({
      name: asset.name.replace('.gitignore', ''),
      downloadUrl: asset.download_url
    }))
}
