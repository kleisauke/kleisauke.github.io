const hash = sha => {
  return sha.substr(0, 7)
}

const branch = ref => {
  return ref.replace('refs/heads/', '')
}

const commitTitle = commitMessage => {
  const index = commitMessage.indexOf('\n')
  return index !== -1 ? commitMessage.substring(0, index) : commitMessage
}

const capitalize = value => {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
}

export { hash, branch, commitTitle, capitalize }
