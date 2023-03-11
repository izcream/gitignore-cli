import { writeFileSync } from 'fs'
import { blue, green } from 'kolorist'
import prompts from 'prompts'
import { getLanguages, gitIgnoreExists } from './utils'

async function main() {
  let language: string = process.argv[2] || ''
  const languages = await getLanguages()
  if (language === '') {
    const select = await prompts({
      type: 'autocomplete',
      name: 'value',
      message: 'Select a language',
      choices: languages.map(({ name }) => ({ title: name, value: name }))
    })
    if (select.value === undefined) {
      process.exit(0)
    }
    language = select.value
  }
  const found = languages.find(({ name }) => name.toLowerCase() === language.toLowerCase())
  if (found === undefined) {
    console.log(`⛔ Language ${blue(language)} not found`)
    process.exit(0)
  }
  if (await gitIgnoreExists()) {
    const overwrite = await prompts({
      type: 'confirm',
      name: 'overwrite',
      message: '.gitignore file already exists. Overwrite?',
      initial: false
    })
    if (!overwrite.overwrite) {
      process.exit(0)
    }
  }
  const res = await fetch(found.downloadUrl)
  const text = await res.text()
  writeFileSync('.gitignore', text)
  console.log(green(`✅ .gitignore file created for ${blue(found.name)}`))
}
main()
