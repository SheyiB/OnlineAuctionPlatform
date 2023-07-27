import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import App from './App'

test('User Can Login', () => {
    test('div is present', () => {
        const { container } = render(<App />)
        const divElements = container.querySelectorAll('div')
      
        expect(divElements.length).toBeGreaterThan(0)
      })
})
