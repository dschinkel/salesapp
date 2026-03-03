import React from 'react';
import { Label } from './ui/label';

export const AppVersion = () => {
  // @ts-ignore
  const version = (typeof process !== 'undefined' && process.env?.PACKAGE_VERSION) || '0.0.0';
  // @ts-ignore
  const sha = (typeof process !== 'undefined' && process.env?.GIT_SHA) || '';

  if (!version) return null;

  return (
    <div className="flex items-center gap-2">
      <Label data-testid="app-version" className="text-primary text-sm font-semibold tracking-wide">
        v{version}
      </Label>
      {sha && <span className="text-muted-foreground text-xs font-medium opacity-70">({sha})</span>}
    </div>
  );
};
