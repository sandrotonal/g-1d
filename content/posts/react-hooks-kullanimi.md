---
title: "React Hooks: Modern Component Development"
date: "2025-09-15"
author: "Ömer Özbay"
excerpt: "Techniques for writing cleaner and more reusable components using React Hooks."
coverImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80"
tags: ["React", "Hooks", "JavaScript", "Frontend"]
category: "FRONTEND"
---

# React Hooks: Modern Component Development

React Hooks allow us to use state and lifecycle features in functional components.

## Basic Hooks

### useState

```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
```

### useEffect

```jsx
import { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser(userId).then(data => setUser(data));
    
    return () => {
      // Cleanup
    };
  }, [userId]);

  return <div>{user?.name}</div>;
}
```

## Custom Hooks

You can create your own hooks:

```jsx
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}
```

## useCallback and useMemo

For performance optimization:

```jsx
const memoizedCallback = useCallback(
  () => doSomething(a, b),
  [a, b]
);

const memoizedValue = useMemo(
  () => computeExpensiveValue(a, b),
  [a, b]
);
```

## Hook Rules

1. Only call at the top level
2. Only use in React functions
3. Custom hooks must start with "use"

## Conclusion

Hooks make React development simpler and more powerful.
