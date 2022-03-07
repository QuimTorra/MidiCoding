// ===== PRIVATE FUNCTION ===== 
// PRE:   ext is the number of notes that the chord consists of
//        notes is an array of notes used to generate the chord
//        inv is the inversion of the chord
// POST:  returns the data in hex format for the specified chord
function GenChord (ext, notes, inv) {
  let data = "";

  for (let i = 0; i < ext; ++i) {
    data += `0090${(notes[i + inv]).toString(16)}66`;
  }
  data += `6080${(notes[0 + inv]).toString(16)}00`;
  for (let i = 1; i < ext; ++i) {
    data += `0080${(notes[i + inv]).toString(16)}00`;
  }

  return data;
}

// PRE:   start is an integer in range [0..127] where 60 is C3
//        inveresion is an integer in range [0..2] that determines the inversion of the chord
// POST:  returns the data in hex format for a 'start' Major Chord in the specified inversion
export function GenMajChord (start, inversion) {
  if (inversion >= 3) inversion = 0;
  const notes = [start, start+4, start+7, start+12, start+16];
  let data = GenChord (3, notes, inversion);
  return data;
}

// PRE:   start is an integer in range [0..127] where 60 is C3
//        inveresion is an integer in range [0..2] that determines the inversion of the chord
// POST:  returns the data in hex format for a 'start' Minor Chord in the specified inversion
export function GenMinChord (start, inversion) {
  if (inversion >= 3) inversion = 0;
  const notes = [start, start+3, start+7, start+12, start+15];
  let data = GenChord (3, notes, inversion);
  return data;
}

// PRE:   start is an integer in range [0..127] where 60 is C3
//        inveresion is an integer in range [0..2] that determines the inversion of the chord
// POST:  returns the data in hex format for a 'start' Diminished Chord in the specified inversion
export function GenDimChord (start, inversion) {
  if (inversion >= 3) inversion = 0;
  const notes = [start, start+3, start+6, start+12, start+15];
  let data = GenChord (3, notes, inversion);
  return data;
}

// PRE:   start is an integer in range [0..127] where 60 is C3
//        inveresion is an integer in range [0..2] that determines the inversion of the chord
// POST:  returns the data in hex format for a 'start' Augmented Chord in the specified inversion
export function GenAugChord (start, inversion) {
  if (inversion >= 3) inversion = 0;
  const notes = [start, start+4, start+8, start+12, start+16];
  let data = GenChord (3, notes, inversion);
  return data;
}