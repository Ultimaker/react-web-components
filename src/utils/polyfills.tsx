import { includes } from 'array-includes';

declare global {
  interface Array<T> {
      includes(searchElement: T) : boolean;
  }
}