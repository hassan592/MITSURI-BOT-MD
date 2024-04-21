import { addExif } from '../lib/sticker.js'
let handler = async (m, { conn, text }) => {
if (!m.quoted) throw '*⌝🥷🏻⌞ قم بلاشارة علي الملصق الذي تريد سرقتة*'
let stiker = false
try {
let [packname, ...author] = text.split('|')
author = (author || []).join('|')
let mime = m.quoted.mimetype || ''
if (!/webp/.test(mime)) throw '*⌝🥷🏻⌞ قم بلاشارة علي الملصق الذي تريد سرقتة*'
let img = await m.quoted.download()
if (!img) throw '*⌝🥷🏻⌞ قم بلاشارة علي الملصق الذي تريد سرقتة*'
stiker = await addExif(img, packname || wm, author || wm)
} catch (e) {
console.error(e)
if (Buffer.isBuffer(e)) stiker = e
} finally {
if (stiker) conn.sendFile(m.chat, stiker, 'wm.webp', '', m, false, { asSticker: true })
else throw '*⌝⚠️⌞ حدث خطأ*'
}}
handler.help = ['سرقة <الاسم>|<الاسم>']
handler.tags = ['ملصقات']
handler.command = /^سرقة$/i
export default handler
