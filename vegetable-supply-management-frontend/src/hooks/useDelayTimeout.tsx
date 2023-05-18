import React, { useEffect, useState } from 'react'

interface Props {
    callback: () => void;
    timeout: number;
}

export const useDelayTimeout = (callback: () => void, timeout: number) => {
  
      const delay = setTimeout(() => callback(), timeout);
  
    React.useEffect(() => {
      return () => {
          clearTimeout(delay);
      };
    }, []);
  
  };
