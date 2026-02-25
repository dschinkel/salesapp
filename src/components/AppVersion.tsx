import React from 'react';
import { Label } from './ui/label';

export const AppVersion = () => {
  // @ts-ignore
  const version = (typeof process !== 'undefined' && process.env?.PACKAGE_VERSION) || '0.0.0';
  // @ts-ignore
  const sha = (typeof process !== 'undefined' && process.env?.GIT_SHA) || '';

  if (!version) return null;

  return (
    <Label 
      data-testid="app-version" 
      className="text-[color:#C5A55A] text-sm font-semibold tracking-wide"
    >
      v{version}{sha ? ` (${sha})` : ''}
    </Label>
  );
};
