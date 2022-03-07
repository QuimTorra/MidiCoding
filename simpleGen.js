// ========================================================================
// ------------------------------CHORDS------------------------------------
// ========================================================================

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

// ========================================================================
// ------------------------------LINES-------------------------------------
// ========================================================================

// ===== PRIVATE FUNCTION =====
// PRE:   notes is an array containing the notes to use
//        if end is true, the scale ends with the octave of the starting note
// POST:  returns the data in hex format for a line with the notes given
function GenLine (notes, end) {
  let data = "";
  if (!end) notes.pop();
  for (let i = 0; i < notes.length; ++i) {
    data += `0090${notes[i].toString(16)}666080${notes[i].toString(16)}00`;
  }

  return data;
}

// PRE:   start is the starting note for the scale
//        godown determines whether the scale must go up or down
//        if end is true the scale will end with the starting note an octave avobe (or below)
// POST:  returns the data in hex format for a major scale starting from the given start note
export function GenMajScale (start, godown = false, end = false) {
  if (godown) {
    return GenLine ([start, start-1, start-3, start-5, start-7, start-8, start-10, start-12], end);
  }
  return GenLine ([start, start+2, start+4, start+5, start+7, start+9, start+11, start+12], end);
}

// PRE:   start is the starting note for the scale
//        godown determines whether the scale must go up or down
//        if end is true the scale will end with the starting note an octave avobe (or below)
// POST:  returns the data in hex format for a minor scale starting from the given start note
export function GenMinScale (start, godown = false, end = false) {
  if (godown) {
    return GenLine ([start, start-2, start-4, start-5, start-7, start-9, start-10, start-12], end);
  }
  return GenLine ([start, start+2, start+3, start+5, start+7, start+8, start+10, start+12], end);
}