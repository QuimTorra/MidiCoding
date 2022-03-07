/* 
  reference: http://midi.teragonaudio.com/tech/midifile.htm
  reference2: https://www.hobbytronics.co.uk/datasheets/9_MIDI_code.pdf

  STATUS = 1 sss nnnn --> sss = type of message && nnnn = channel number to which the message apply
  DATA1 = 0 xxx xxxx
  DATA2 = 0 xxx xxxx
*/

import { GenDimChord, GenMajChord, GenMinChord } from './generators.js';
import fs from 'fs'
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
// let MTrk_data = "00903C66009040660090436661803C40008040400080434000";

// This creates a Chromatic Scale starting from Middle C (C3)
// let MTrk_data = ""
// let MTrk_length = 0;
// for (let i = 0; i < 12; ++i) {
//   const note = (60 + i).toString(16);
//   let data = `0090${note}666080${note}40`;
//   MTrk_length += data.length / 2;
//   MTrk_data += data;
// }

let MTrk_data = GenMajChord(60, 0) + GenMinChord(62, 0) + GenMinChord(64, 0) + GenMajChord(65, 0) + GenMajChord(67, 0) + GenMinChord(69, 0) + GenDimChord(71, 0) + GenMajChord(72, 0);

let MTrk_length = (MTrk_data.length/2).toString(16);
while ( MTrk_length.length < 8 ) {
  MTrk_length = "0" + MTrk_length;
}

const MTrk_BUFFER = MTrk_ID + MTrk_length.toString(16) + MTrk_data + MTrk_end;
const MTrk = Buffer.from(MTrk_BUFFER, "hex");
fs.appendFileSync(file, MTrk);

console.log("File formatting ended!")