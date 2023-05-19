export default eventHandler(async event => {
  const json = await fetch('https://raw.githubusercontent.com/shitoujianzibu/antAnswer/main/farm.json')
  return json.json()
}) 
