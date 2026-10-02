# Week 5 — Redux State Management

A React + TypeScript counter application demonstrating **manual Redux setup** (no Redux Toolkit). Built as part of the Week 5 Guided Learning Activity.

## 📚 Learning Objectives

This project demonstrates how to:

- Set up a Redux store manually with `createStore` and `applyMiddleware`
- Create action types, action creators, and reducers
- Combine reducers with `combineReducers`
- Connect Redux to React using the `<Provider>` component
- Read global state with `useSelector`
- Update global state with `useDispatch`
- Add middleware such as `redux-logger`
- Write the whole thing in **TypeScript** with proper typing

## 🛠️ Tech Stack

| Tool | Purpose |
|---|---|
| React 19 | UI library |
| TypeScript | Type safety |
| Vite | Build tool & dev server |
| Redux 5 | State management |
| React-Redux 9 | React bindings for Redux |
| redux-logger | Middleware that logs actions and state changes |

> **Note:** This project uses **manual Redux setup** — no `@reduxjs/toolkit`.

## 📁 Project Structure

```
.
├── src/
│   ├── components/
│   │   └── Counter.tsx              # UI: reads state, dispatches actions
│   ├── features/
│   │   └── counter/
│   │       ├── counterActions.ts    # Action creators: increment, decrement, reset
│   │       ├── counterReducer.ts    # Reducer: handles counter state transitions
│   │       └── counterTypes.ts      # Action types + TypeScript interfaces
│   ├── store/
│   │   ├── rootReducer.ts           # combineReducers + RootState type
│   │   └── store.ts                 # createStore + middleware + AppDispatch type
│   ├── App.tsx                      # Root component rendering <Counter />
│   ├── main.tsx                     # Entry point wrapping <App /> in <Provider>
│   └── index.css                    # Global styles
├── index.html
├── package.json
├── tsconfig.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/kellynshuti9/-week5-redux-counter.git
cd -week5-redux-counter

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173).

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite dev server with hot reload |
| `npm run build` | Build a production bundle into `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint over the source |

## 🧠 How It Works

### 1. Action Types & Types (`counterTypes.ts`)

Defines string constants for each action and a union type that the reducer uses to narrow action shapes.

```ts
export const INCREMENT = 'counter/increment';
export const DECREMENT = 'counter/decrement';
export const RESET     = 'counter/reset';

export interface CounterState {
  value: number;
}

export type CounterActionTypes =
  | { type: typeof INCREMENT }
  | { type: typeof DECREMENT }
  | { type: typeof RESET };
```

### 2. Action Creators (`counterActions.ts`)

Functions that return action objects. Each one is typed with `CounterActionTypes`.

```ts
export const increment = (): CounterActionTypes => ({ type: INCREMENT });
export const decrement = (): CounterActionTypes => ({ type: DECREMENT });
export const reset     = (): CounterActionTypes => ({ type: RESET });
```

### 3. Reducer (`counterReducer.ts`)

A pure function that takes the current state and an action, and returns the new state. Never mutates — always spreads.

```ts
const initialState: CounterState = { value: 0 };

export const counterReducer = (
  state = initialState,
  action: CounterActionTypes
): CounterState => {
  switch (action.type) {
    case INCREMENT: return { ...state, value: state.value + 1 };
    case DECREMENT: return { ...state, value: state.value - 1 };
    case RESET:     return { ...state, value: 0 };
    default:        return state;
  }
};
```

### 4. Root Reducer (`rootReducer.ts`)

Combines all feature reducers under named keys in the global state tree. Here the counter lives at `state.counter`.

```ts
export const rootReducer = combineReducers({
  counter: counterReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
```

### 5. Store (`store.ts`)

Creates the store with the combined reducer and wires up `redux-logger`. Uses `legacy_createStore` for compatibility with the classic manual-Redux API.

```ts
const loggerMiddleware = (logger as any).default ?? logger;

export const store = createStore(
  rootReducer,
  applyMiddleware(loggerMiddleware)
);

export type AppDispatch = typeof store.dispatch;
```

### 6. Provider (`main.tsx`)

The `<Provider>` component makes the store available to every component in the tree.

```tsx
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
```

### 7. Component (`Counter.tsx`)

Reads the counter value with `useSelector` and dispatches actions with `useDispatch`. Any state change automatically re-renders.

```tsx
const value = useSelector((state: RootState) => state.counter.value);
const dispatch = useDispatch();

<button onClick={() => dispatch(increment())}>Increment</button>
<button onClick={() => dispatch(decrement())}>Decrement</button>
<button onClick={() => dispatch(reset())}>Reset</button>
```

## 🔄 Data Flow

```
User clicks button
      │
      ▼
dispatch(increment())
      │
      ▼
Redux store passes action to counterReducer
      │
      ▼
Reducer returns new state { value: old + 1 }
      │
      ▼
redux-logger prints prev state, action, next state
      │
      ▼
useSelector detects change → Counter re-renders
```

## ✅ Features

- [x] Increment the counter
- [x] Decrement the counter
- [x] Reset the counter to 0
- [x] Global state shared via Redux
- [x] Action logging via `redux-logger`
- [x] Fully typed with TypeScript

## 🧪 Testing the App

1. Run `npm run dev` and open the local URL.
2. Click **Increment** — the count should increase by 1.
3. Click **Decrement** — the count should decrease by 1.
4. Click **Reset** — the count should return to 0.
5. Open the browser DevTools console — you should see `redux-logger` output for every action showing the previous state, the dispatched action, and the next state.

## 📖 Key Concepts Demonstrated

| Concept | Where |
|---|---|
| Store creation | `src/store/store.ts` |
| Middleware | `applyMiddleware` in `store.ts` |
| Action types as constants | `src/features/counter/counterTypes.ts` |
| Action creators | `src/features/counter/counterActions.ts` |
| Reducer with default case | `src/features/counter/counterReducer.ts` |
| Reducer composition | `combineReducers` in `rootReducer.ts` |
| React-Redux Provider | `src/main.tsx` |
| Reading state | `useSelector` in `Counter.tsx` |
| Dispatching actions | `useDispatch` in `Counter.tsx` |
| TypeScript typing | Interfaces, union types, `RootState`, `AppDispatch` |

## 📝 Assignment Notes

This project was completed as part of the **Week 5 Guided Learning Activity: Redux State Management**. Requirements met:

- ✅ Redux store configured with `createStore` + middleware
- ✅ Actions, reducers, and types separated by concern
- ✅ Reducers combined with `combineReducers`
- ✅ Application wrapped with `<Provider>`
- ✅ State read via `useSelector`, updated via `useDispatch`
- ✅ `redux-logger` middleware logging every action
- ✅ Meaningful incremental commits with clear messages
- ✅ `node_modules` excluded from version control

