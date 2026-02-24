import React from 'react';
import { Label } from './ui/label';

export const AppVersion = () => {
  const version = import.meta.env?.PACKAGE_VERSION;
  const sha = import.meta.env?.GIT_SHA;

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
