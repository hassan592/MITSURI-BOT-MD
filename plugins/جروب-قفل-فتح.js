var handler = async (m, {conn, args, usedPrefix, command}) => {

const isClose = { 'فتح': 'not_announcement', 'قفل': 'announcement', 'طفي': 'not_announcement', 'شغل': 'announcement', 'abrir': 'not_announcement', 'cerrar': 'announcement', 'desbloquear': 'unlocked', 'bloquear': 'locked' }[(args[0] || '')]

if (isClose === undefined) { return conn.reply(m.chat, `*⌝❕⌞ اختر احد الخيارات لي فتح/قفل المجموعة*`, m, fake, )

}
await conn.groupSettingUpdate(m.chat, isClose)
{ conn.reply(m.chat, '*⌝☑️⌞ تم تنفيذ طلبك بنجاح*', m, fake, ) }

}
handler.help = ['جروب فتح / قفل', 'الجروب فتح / قفل']
handler.tags = ['جروب']
handler.command = /^(جروب|الجروب)$/i
handler.admin = true
handler.botAdmin = true

export default handler
