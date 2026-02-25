import { render, screen } from '@testing-library/react';
import * as React from 'react';
// @ts-ignore
import App from '../src/App';

describe('App', () => {
    it('page loads', () => {
        render(React.createElement(App));
        expect(screen.getByText(/Key Points/i)).toBeInTheDocument();
    });
});
