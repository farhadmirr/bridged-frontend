import React from 'react'
import platform from 'platform';
import useWindowDimensions from '../hooks/useWindowDimensions';
export const OS = platform.os


export function startsWith(str, word) {
    return str.lastIndexOf(word, 0) === 0;
}