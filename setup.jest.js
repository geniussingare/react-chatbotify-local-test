import { TextDecoder, TextEncoder } from 'util';
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// jsdom does not implement scrollTo, mock to avoid warnings.
window.scrollTo = jest.fn();
console.error = jest.fn();