export interface CounterState {
  count: number;
}

export interface CounterAction {
  type: string;
  payload?: number;
  [key: string]: any;
} 