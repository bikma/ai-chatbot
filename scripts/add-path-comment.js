// scripts\add-path-comment.js
const fs = require('fs')
const path = require('path')

const addPathComment = filePath => {
  const relativePath = path.relative(process.cwd(), filePath)
  const comment = `// ${relativePath}\n`

  // Check if file exists
  if (fs.existsSync(filePath)) {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) throw err

      // Normalize content to avoid formatting differences, check if the comment is already present
      const fileContentWithoutWhitespace = data.trim().replace(/\s/g, '')
      const commentWithoutWhitespace = comment.trim().replace(/\s/g, '')

      if (!fileContentWithoutWhitespace.startsWith(commentWithoutWhitespace)) {
        const updatedContent = comment + data
        fs.writeFile(filePath, updatedContent, 'utf8', err => {
          if (err) throw err
          console.log(`Added relative path to ${filePath}`)
        })
      } else {
        console.log(`Relative path already exists in ${filePath}, skipping...`)
      }
    })
  } else {
    console.log(`File ${filePath} does not exist, skipping...`)
  }
}

// Get all staged files from command line arguments
const stagedFiles = process.argv.slice(2)

// Process only JS, TS, or TSX files
stagedFiles.forEach(file => {
  if (file.endsWith('.js') || file.endsWith('.ts') || file.endsWith('.tsx')) {
    addPathComment(file)
  }
})
