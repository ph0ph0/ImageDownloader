
const download = require('image-downloader')
// (1) Set this to the location of where the imageURLs.json file is that you would like to download from
const urlArrayJSON = require('')

async function downloadIMG() {
  for (var objectID in urlArrayJSON) {
    var counter = 1
    console.log(`*********Downloading images for objectID: ${objectID}`)
    var urlArrayOfImagesForObjectID = urlArrayJSON[objectID]
    while (urlArrayOfImagesForObjectID.length > 0) {
      let imageURL = [urlArrayJSON[objectID][0]]
      let uri = encodeURI(imageURL)

      // (2) This is where the images will be downloaded to
      const filename = `<path>/${objectID}(${counter}).png`
      // console.log(filename)
      ++counter
      const options = {
        url: uri,
        dest: filename                  
      }
      try {
        const { filename, image } = await download.image(options)
        console.log(filename) // => /path/to/dest/image.jpg 
      } catch (e) {
        console.error(e)
      }
      urlArrayOfImagesForObjectID.shift()
    }
  }
}

downloadIMG().then((response) => {
  console.log(`Success!`)
}).catch(function (err) {
  console.log(`Error caught: ${err}`)
})
