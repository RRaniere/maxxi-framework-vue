import { MarkerType, Position } from '@vue-flow/core';
const data = [
  {
    id: '1',
    type: 'input',
    label: 'Anne Teak',
    position: { x: 400, y: 5 },
    class: 'light'
  },
  {
    id: '2',
    label: 'Colin Sik',
    position: { x: 100, y: 100 },
    class: 'light'
  },
  { id: '3', label: 'Jen Tile', position: { x: 400, y: 100 }, class: 'light' },
  { id: '4', label: 'Harriet Upp', position: { x: 800, y: 100 }, class: 'light' },
  {
    id: '5',
    type: 'output',
    label: 'Karen Onnabit',
    position: { x: 100, y: 180 },
    class: 'light'
  },
  {
    id: '6',
    label: 'Anne Thurium',
    position: { x: 400, y: 180 },
    class: 'light'
  },
  {
    id: '7',
    type: 'output',
    label: 'Mark Ateer',
    position: { x: 700, y: 200 },
    class: 'light'
  },
  {
    id: '8',
    type: 'output',
    label: 'Dave Allippa',
    position: { x: 900, y: 200 },
    class: 'light'
  },
  {
    id: '9',
    type: 'output',
    label: 'Liz Erd',
    position: { x: 300, y: 280 },
    class: 'light'
  },
  {
    id: '10',
    type: 'output',
    label: 'Percy Vere',
    position: { x: 500, y: 280 },
    class: 'light'
  },
  { id: 'e1-2', type: 'step', source: '1', target: '2', animated: true },
  {
    id: 'e1-3',
    type: 'step',
    source: '1',
    target: '3'
  },
  {
    id: 'e1-4',
    type: 'step',
    source: '1',
    target: '4',
    markerEnd: MarkerType.Arrow
  },
  {
    id: 'e2-5',
    type: 'step',
    source: '2',
    target: '5'
  },
  {
    id: 'e3-6',
    type: 'step',
    source: '3',
    target: '6'
  },
  {
    id: 'e4-7',
    type: 'step',
    source: '4',
    target: '7'
  },
  {
    id: 'e4-8',
    type: 'step',
    source: '4',
    target: '8'
  },
  {
    id: 'e6-9',
    type: 'step',
    source: '6',
    target: '9'
  },
  {
    id: 'e6-10',
    type: 'step',
    source: '6',
    target: '10'
  }
];

export default data;

const dataHorizontal = [
  {
    id: '1',
    type: 'input',
    label: 'Node 1',
    position: { x: 0, y: 50 },
    sourcePosition: Position.Right
  },
  {
    id: '2',
    type: 'output',
    label: 'Node 2',
    position: { x: 250, y: 0 },
    targetPosition: Position.Left
  },
  {
    id: '3',
    label: 'Node 3',
    position: { x: 250, y: 100 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left
  },
  {
    id: '4',
    label: 'Node 4',
    position: { x: 500, y: 150 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left
  },
  {
    id: '5',
    type: 'output',
    label: 'Node 5',
    position: { x: 750, y: 50 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left
  },
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e1-3', source: '1', target: '3', markerEnd: MarkerType.Arrow },
  {
    id: 'e4-5',
    source: '4',
    target: '5',
    style: { stroke: 'orange' },
    labelBgStyle: { fill: 'orange' }
  },
  { id: 'e3-4', source: '3', target: '4' }
];

export { dataHorizontal };
