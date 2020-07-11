export const COLS = 10
export const ROWS = 20
export const BLOCK_SIZE = 30
export const SHAPES = [
  [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  [
    [2, 0, 0],
    [2, 2, 2],
    [0, 0, 0],
  ],
  [
    [0, 0, 3], // 0,0 -> 2,0 ; 0,1 -> 1,0 ; 0,2 -> 0,0
    [3, 3, 3], // 1,0 -> 2,1 ; 1,1 -> 1,1 ; 1,2 -> 0,1
    [0, 0, 0],
  ], // 2,0 -> 2,2 ; 2,1 -> 1,2 ; 2,2 -> 0,2
  [
    [4, 4],
    [4, 4],
  ],
  [
    [0, 5, 5],
    [5, 5, 0],
    [0, 0, 0],
  ],
  [
    [0, 6, 0],
    [6, 6, 6],
    [0, 0, 0],
  ],
  [
    [7, 7, 0],
    [0, 7, 7],
    [0, 0, 0],
  ],
]

export enum COLOR {
  'none',
  'cyan',
  'blue',
  'orange',
  'yellow',
  'green',
  'purple',
  'red',
}

export enum KEY {
  ESC = 27,
  SPACE = 32,
  LEFT = 37,
  UP = 38,
  RIGHT = 39,
  DOWN = 40,
  P = 80,
  Q = 81,
}

export enum ROTATION {
  LEFT = 'left',
  RIGHT = 'right',
}
