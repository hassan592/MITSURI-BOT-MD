const cooldown = 10800000;
let ro = 1500
let d = 20

let handler = async (m, {conn, text, usedPrefix, command, groupMetadata}) => {
  let time = global.db.data.users[m.sender].lastrob + 1800000;
  if (new Date() - global.db.data.users[m.sender].lastrob < 1800000) throw `*⌝⏳⌞ انتظر ${msToTime(time - new Date())} للزرف مرة أخرى*`;
  if (!text) return m.reply(`*⌝⚠️⌞ ضع علامة على المستخدم الذي زرفة*`);
  try { 
    let _user = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender;
    if (!_user in global.db.data.users) return m.reply(`➳ El usuɑrio no estά registrɑdo en lɑ bɑse de dɑtos!`);
    if (m.quoted?.sender) m.mentionedJid.push(m.quoted.sender);
    if (!m.mentionedJid.length) m.mentionedJid.push(m.sender);
    if (global.db.data.users[_user] == undefined) return m.reply(`➳ El usuɑrio no estά registrɑdo en lɑ bɑse de dɑtos!`);
    let uuser = global.db.data.users[_user];
    let exp = Math.floor(Math.random() * ro)
    let diamond = Math.floor(Math.random() * d)
    let raid = `*ʜᴀs sᴀǫᴜᴇᴀᴅᴏ ⚔️ ᴀ @${_user.split("@s.whatsapp.net")[0]}*
*خيرة: ${exp}*
*فلوس: ${diamond}*

*الشخص الذي انزرف: @${m.sender.split("@")[0]}*`;
    if (uuser.diamond <= 5) return m.reply("*⌝🧔🏿⌞ هذا المستخدم فقير لا تستطيع زرفة*");
    if (uuser.exp <= 10) return m.reply(`*⌝🧔🏿⌞ هذا المستخدم فقير لا تستطيع زرفة*`);
    global.db.data.users[_user].exp -= exp * 1;
    global.db.data.users[_user].diamond -= diamond * 1;
    global.db.data.users[m.sender].exp += exp * 1;
    global.db.data.users[m.sender].diamond += diamond * 1;
    await await conn.sendMessage(m.chat, {text: raid, mentions: [_user, m.sender]}, {quoted: m});
    /*conn.sendMessage(
    _user,
    {
      text: `*❕@${m.sender.split("@")[0]} TE ACABA DE ROBAR!*`,
      mentions: [m.sender],
    },
    { quoted: m }
  );*/
    global.db.data.users[m.sender].lastrob = new Date() * 1;
  } catch {
    await m.reply(`*⌝👮🏻‍♂️⌞ لا يمكنك سرقته لأن الشرطة تحمي هذا المستخدم (AFK)*`);
  }
};

handler.help = ["زرف [@user]"];
handler.tags = ['بنك']
handler.command = /^(زرف|هجوم|rob|robar)$/i;
handler.group = true;
handler.cooldown = cooldown;
export default handler;

function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  return hours + " ساعة " + minutes + " دقيقة ";
                         }
