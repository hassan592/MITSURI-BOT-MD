import { xpRange } from '../lib/levelling.js';
import Canvacord from 'canvacord';

let handler = async (m, { conn }) => {
  let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;

  if (!(who in global.db.data.users)) throw `*〘لم يتم العثور على المستخدم في قاعدة البيانات الخاصة بي〙*`;

  let pp = await conn.profilePictureUrl(who, 'image').catch(_ => './Menu2.jpg');
  let user = global.db.data.users[who];
  let { exp, level, role } = global.db.data.users[who];
  let { min, xp } = xpRange(user.level, global.multiplier);
  let username = conn.getName(who);

  let crxp = exp - min
  let customBackground  = './song.jpg'
  let requiredXpToLevelUp = xp

  const card = await new Canvacord.Rank()
  .setAvatar(pp)
  .setLevel(level)
  .setCurrentXP(crxp) 
  .setRequiredXP(requiredXpToLevelUp) 
  .setProgressBar('#db190b', 'COLOR') // Set progress bar color here
  .setDiscriminator(who.substring(3, 7))
  .setCustomStatusColor('#db190b')
  .setLevelColor('#FFFFFF', '#FFFFFF')
  .setOverlay('#000000')
  .setUsername(username)
  .setBackground('IMAGE', customBackground)
  .setRank(level, 'LEVEL', false)
  .renderEmojis(true)
  .build();

  const str = `*┓⌯━ ── • ♬ • ── ━⌯*
*┇⌊الاسـم🪪⌉: ${username}*
*┇*
*┇⌊المستوي👩🏻‍💻⌉:${user.level}*
*┇*
*┇⌊الخـبـرة🧪⌉: ${crxp} / ${requiredXpToLevelUp}*
*┇*
*┇⌊الرتـبـة🥷🏻⌉: ${role}*
*┛⌯━ ── • ♬ • ── ━⌯*
*كلما تفاعلت كلما زاد مستواك*`

  try {
    conn.sendFile(m.chat, card, 'rank.jpg', str, m, false, { mentions: [who] });
    m.react('🍷');
  } catch (error) {
    console.error(error);
  }}

handler.help = ['لفل'];
handler.tags = ['رانك'];
handler.command = ['لفل'];

export default handler;
