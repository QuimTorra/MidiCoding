/* 
  reference: http://midi.teragonaudio.com/tech/midifile.htm
  STATUS = 1 sss nnnn --> sss = type of message && nnnn = channel number to which the message apply
  DATA1 = 0 xxx xxxx
  DATA2 = 0 xxx xxxx
*/

const fs = require('fs');
const file = "./midifiles/file.mid";

fs.unlinkSync(file);

/*
  MThd Header
  4D 54 68 64     MThd ID
  00 00 00 06     Length of the MThd chunk is always 6.
  00 01           The Format type is 1.
  00 02           There are 2 MTrk chunks in this file.
  00 60           PPQN (Pulses Per Quarter Note) --> 96 in FLs
*/
const MThd_ID = "4D546864";
const MThd_length = "00000006";
const MThd_format = "0001";
const MThd_mtrk = "0001";
const MThd_ppqn = "0060";
const MThd_BUFFER = MThd_ID + MThd_length + MThd_format + MThd_mtrk + MThd_ppqn;
const MThd_HEADER = Buffer.from(MThd_BUFFER, "hex");
fs.appendFileSync(file, MThd_HEADER);

/* 
  MTrk Chunks
  We need as many MTrk Chunks as specified in MThd

  4D 54 72 6B MTrk ID
  00 00 00 0x     Length of the MTrk chunk (including the EOF)
  tt ss dd dd     tt = ticks from last event ; ss = status code ; dd = data1 and data2

  A note-on (9n) allways needs to get it's note-off (8n)

*/
const MTrk_ID = "4D54726B";
const MTrk_end = "FF2F00"; // this is NOT optional, and must be introduced at the end of every single track;
// C3 | E3 | G3 + note-offs
let MTrk_data = "00903C66009040660090436661803C40008040400080434000";
let MTrk_length = "00000019";

const MTrk_BUFFER = MTrk_ID + MTrk_length + MTrk_data + MTrk_end;
const MTrk = Buffer.from(MTrk_BUFFER, "hex");
fs.appendFileSync(file, MTrk);

console.log("File formatting ended!")