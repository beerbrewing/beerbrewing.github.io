/**
 * @file setupTests.js
 * @description Setup file for Jest testing with React 19.1 compatibility
 * @author Pyrmont Brewery
 * @version 1.0.0
 */

// Import necessary testing libraries
import '@testing-library/jest-dom';

// Setup for React 19 compatibility
// This helps with certain React hooks and features that might be used in tests
global.IS_REACT_ACT_ENVIRONMENT = true;

// Mock matchMedia which is not available in Jest but might be needed by some components
window.matchMedia = window.matchMedia || function() {
  return {
    matches: false,
    addListener: function() {},
    removeListener: function() {}
  };
};

// Mock ResizeObserver which is not available in Jest
window.ResizeObserver = window.ResizeObserver || class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
};

// Console warning override to suppress React 19 warnings during testing
const originalConsoleWarn = console.warn;
console.warn = function(msg) {
  // Filter out specific React 19 deprecation warnings during tests
  if (msg && (
    msg.includes('ReactDOM.render is no longer supported') ||
    msg.includes('Use createRoot instead')
  )) {
    return;
  }
  originalConsoleWarn.apply(console, arguments);
};
