type Point = number[]

interface Templates {
  [key: string]: Point[][]
}

class DTW {
  constructor() { }

  distance(seq1: Point[], seq2: Point[]) {
    const n = seq1.length;
    const m = seq2.length;
    const dtw = Array.from(Array(n + 1), () => Array(m + 1).fill(Infinity));
    dtw[0][0] = 0;

    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= m; j++) {
        const dist = this.euclideanDistance(seq1[i - 1], seq2[j - 1]);
        dtw[i][j] = dist + Math.min(
          dtw[i - 1][j],
          dtw[i][j - 1],
          dtw[i - 1][j - 1]
        );
      }
    }

    return dtw[n][m];
  }

  euclideanDistance(point1: Point, point2: Point) {
    return Math.sqrt(Math.pow(point1[0] - point2[0], 2) + Math.pow(point1[1] - point2[1], 2));
  }
}


class Recognizer {
  templates: Templates;

  constructor() {
    this.templates = {};
  }

  addTemplate(name: string, strokes: Point[][]) {
    this.templates[name] = strokes;
  }

  clear() {
    this.templates = {}
  }

  recognize(drawnStrokes: Point[][]) {
    const dtw = new DTW();

    const symbols = []

    for (const [name, templateStrokes] of Object.entries(this.templates)) {
      const score = this.calculateScore(drawnStrokes, templateStrokes, dtw);
      symbols.push({ name, score })
    }

    const sortedSymbols = symbols
      .filter(symbol => symbol.score !== Infinity)
      .filter(symbol => symbol.score < 16)
      .sort((a, b) => a.score - b.score)
      .slice(0, 3)

    if (sortedSymbols.length === 0) return null

    return sortedSymbols;
  }

  calculateScore(drawnStrokes: Point[][], templateStrokes: Point[][], dtw: DTW) {
    if (drawnStrokes.length !== templateStrokes.length) {
      return Infinity;
    }

    let totalScore = 0;
    for (let i = 0; i < drawnStrokes.length; i++) {
      const drawnStroke = drawnStrokes[i];
      const templateStroke = templateStrokes[i];

      const strokeScore = dtw.distance(drawnStroke, templateStroke);
      totalScore += strokeScore;
    }

    return totalScore / drawnStrokes.length;
  }
}
export default Recognizer;