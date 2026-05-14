'use client';

import { EventEmitter } from 'events';

/**
 * Global error emitter for surfacing contextual Firebase errors.
 */
export const errorEmitter = new EventEmitter();

// Increase limit if many listeners are registered
errorEmitter.setMaxListeners(20);
