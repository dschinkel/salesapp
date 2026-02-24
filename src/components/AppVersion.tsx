import React from 'react';
import { Badge } from './ui/badge';

export const AppVersion = () => {
  const version = import.meta.env?.PACKAGE_VERSION;
  const sha = import.meta.env?.GIT_SHA;

  if (!version) return null;

  return (
    <Badge 
      data-testid="app-version" 
      variant="outline" 
      className="text-[color:#C5A55A] border-[color:#C5A55A]"
    >
      v{version}{sha ? ` (${sha})` : ''}
    </Badge>
  );
};
