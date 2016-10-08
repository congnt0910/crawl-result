// lay thong tin loai xo so tu menu trang ketqua.net
import cheerio from 'cheerio'
import path from 'path'
import fs from 'fs'

function readFile (pathFile) {
  return fs.readFileSync(path.join(__dirname, pathFile), 'utf8')
}

function panicIfError ($node, message) {
  if ($node.length === 0) throw new Error(message)
}

function parse (raw) {
  const response = []
  const $ = cheerio.load(raw)
  const $body = $('body')

  const $sidebar = $body.find('#left_menu')
  panicIfError($sidebar, 'Not found .left_menu')

  let $liTagsLevel1 = $sidebar.find('>li')
  // remove first child
  $liTagsLevel1 = $liTagsLevel1.not($liTagsLevel1.eq(0))

  $liTagsLevel1.get().forEach((val) => {
    const $li = $(val)
    const $title = $li.find('>a')

    const mien = $title.text().trim() // ten mien

    // danh sach loai trong mien
    const $liLoai = $li.find('>ul >li')
    $liLoai.get().forEach(liLoai => {
      const LoaiObj = {
        mien: mien
      }
      const $linkLoai = $(liLoai).find('>a')
      LoaiObj.name = $linkLoai.text().trim()
      LoaiObj.url = $linkLoai.attr('href')
      const lastSlash = LoaiObj.url.lastIndexOf('/')
      if (lastSlash > -1) {
        LoaiObj.url = LoaiObj.url.substring(0, lastSlash) + '.php'
      }
      response.push(LoaiObj)
    })
  })
  return response
}

const raw = readFile('index.htm')
console.log(parse(raw))

