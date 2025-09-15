import React, { useState, useEffect, useMemo, useCallback, useReducer, useRef, useContext, createContext, memo } from 'react';
import { Clock, RefreshCw, Zap, Target, Eye, Calculator, Users, MessageSquare, Settings, Play, Pause, RotateCcw } from 'lucide-react';

// Context for useContext example
const ThemeContext = createContext();
const CountContext = createContext();

// Reducer for useReducer example
const counterReducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1, history: [...state.history, `+1 at ${new Date().toLocaleTimeString()}`] };
    case 'decrement':
      return { count: state.count - 1, history: [...state.history, `-1 at ${new Date().toLocaleTimeString()}`] };
    case 'reset':
      return { count: 0, history: ['Reset at ' + new Date().toLocaleTimeString()] };
    case 'multiply':
      return { count: state.count * action.payload, history: [...state.history, `×${action.payload} at ${new Date().toLocaleTimeString()}`] };
    default:
      return state;
  }
};

// Memoized component example
const ExpensiveChild = memo(({ data, onAction }) => {
  const [renderCount, setRenderCount] = useState(0);
  
 
//   React.useLayoutEffect(() => {
//     setRenderCount(prev => prev + 1);
//   });

  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-2">
        <Eye className="w-4 h-4 text-red-600" />
        <span className="font-semibold text-red-700">Expensive Child Component</span>
        <span className="bg-red-200 text-red-800 px-2 py-1 rounded-full text-xs">
          Renders: {renderCount}
        </span>
      </div>
      <p className="text-sm text-gray-600 mb-2">Data: {data}</p>
      <button 
        onClick={onAction}
        className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
      >
        Click Me (useCallback test)
      </button>
    </div>
  );
});

// Main component
const ReactHooksGuide = () => {
  // useState examples
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  const [theme, setTheme] = useState('light');
  
  // useEffect example
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  
  // useMemo example
  const [numbers, setNumbers] = useState([1, 2, 3, 4, 5]);
  const [multiplier, setMultiplier] = useState(1);
  
  // useCallback example
  const [parentRender, setParentRender] = useState(0);
  const [childData, setChildData] = useState('Initial data');
  
  // useReducer example
  const [counterState, dispatch] = useReducer(counterReducer, { 
    count: 0, 
    history: ['Initial state'] 
  });
  
  // useRef examples
  const inputRef = useRef(null);
  const renderCountRef = useRef(0);
  const [inputValue, setInputValue] = useState('');

  // Timer effect
  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    } else if (!isRunning && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, seconds]);

  // Render count tracking
  renderCountRef.current = renderCountRef.current + 1;

  // useMemo - expensive calculation
  const expensiveValue = useMemo(() => {
    console.log('🔥 Expensive calculation running...');
    return numbers.reduce((acc, num) => acc + num * multiplier, 0);
  }, [numbers, multiplier]);

  // useCallback - memoized function
  const handleChildAction = useCallback(() => {
    console.log('🚀 Callback function called');
    alert('useCallback working! This function is memoized.');
  }, []); // Empty dependency array means function never changes

  // Regular function (will cause child re-render)
  const regularFunction = () => {
    console.log('📝 Regular function called');
    alert('Regular function called');
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <CountContext.Provider value={count}>
        <div className={`min-h-screen transition-colors duration-300 ${
          theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
        }`}>
          <div className="container mx-auto px-4 py-8 max-w-6xl">
            
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                🚀 React Hooks Complete Guide
              </h1>
              <p className="text-lg text-gray-600">Interactive examples you'll never forget!</p>
              <div className="mt-4 bg-yellow-100 border border-yellow-300 rounded-lg p-3">
                <p className="text-sm text-yellow-800">
                  <strong>Component Renders:</strong> {renderCountRef.current} times
                </p>
              </div>
            </div>

            {/* Theme Switcher */}
            <div className="flex justify-center mb-8">
              <button
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
              >
                <Settings className="w-4 h-4" />
                {theme === 'light' ? 'Dark' : 'Light'} Mode
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* useState */}
              <HookCard
                title="useState"
                icon={<Target className="w-6 h-6 text-blue-500" />}
                description="Component में state manage करने के लिए"
                realLife="📱 Mobile app में like count, form inputs"
              >
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center gap-4 mb-3">
                      <button
                        onClick={() => setCount(count - 1)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        -
                      </button>
                      <span className="text-2xl font-bold text-blue-600">{count}</span>
                      <button
                        onClick={() => setCount(count + 1)}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      >
                        +
                      </button>
                    </div>
                    
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Type your name..."
                      className="w-full p-2 border rounded"
                    />
                    {name && <p className="mt-2 text-green-600">Hello, {name}! 👋</p>}
                  </div>
                  
                  <CodeBlock>
{`const [count, setCount] = useState(0);
const [name, setName] = useState('');

// Usage
<button onClick={() => setCount(count + 1)}>
  Count: {count}
</button>`}
                  </CodeBlock>
                </div>
              </HookCard>

              {/* useEffect */}
              <HookCard
                title="useEffect"
                icon={<RefreshCw className="w-6 h-6 text-green-500" />}
                description="Side effects handle करने के लिए (API calls, timers, subscriptions)"
                realLife="⏰ Timer, 📡 API data fetching, 👂 Event listeners"
              >
                <div className="space-y-4">
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <div className="text-3xl font-bold text-green-600 mb-3">
                      ⏱️ {seconds}s
                    </div>
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => setIsRunning(!isRunning)}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center gap-2"
                      >
                        {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        {isRunning ? 'Pause' : 'Start'}
                      </button>
                      <button
                        onClick={() => setSeconds(0)}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 flex items-center gap-2"
                      >
                        <RotateCcw className="w-4 h-4" />
                        Reset
                      </button>
                    </div>
                  </div>
                  
                  <CodeBlock>
{`useEffect(() => {
  let interval = null;
  if (isRunning) {
    interval = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);
  }
  return () => clearInterval(interval); // Cleanup
}, [isRunning]);`}
                  </CodeBlock>
                </div>
              </HookCard>

              {/* useMemo */}
              <HookCard
                title="useMemo"
                icon={<Calculator className="w-6 h-6 text-purple-500" />}
                description="Expensive calculations को memoize करता है"
                realLife="📊 Heavy calculations, 🔍 Filtered lists, 📈 Data processing"
              >
                <div className="space-y-4">
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="mb-3">
                      <label className="block text-sm font-medium mb-1">Numbers: [1,2,3,4,5]</label>
                      <label className="block text-sm font-medium mb-2">Multiplier:</label>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={multiplier}
                        onChange={(e) => setMultiplier(Number(e.target.value))}
                        className="w-full"
                      />
                      <span className="text-purple-600 font-bold">{multiplier}</span>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        Result: {expensiveValue}
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        Open console to see when calculation runs
                      </p>
                    </div>
                    
                    <button
                      onClick={() => setNumbers([...numbers, Math.floor(Math.random() * 10)])}
                      className="w-full mt-2 bg-purple-500 text-white px-3 py-2 rounded hover:bg-purple-600"
                    >
                      Add Random Number
                    </button>
                  </div>
                  
                  <CodeBlock>
{`const expensiveValue = useMemo(() => {
  console.log('Calculating...');
  return numbers.reduce((acc, num) => 
    acc + num * multiplier, 0
  );
}, [numbers, multiplier]); // Only recalculate when these change`}
                  </CodeBlock>
                </div>
              </HookCard>

              {/* useCallback */}
              <HookCard
                title="useCallback"
                icon={<Zap className="w-6 h-6 text-yellow-500" />}
                description="Functions को memoize करता है, child re-renders prevent करता है"
                realLife="🔄 Prevent unnecessary re-renders, 📝 Event handlers optimization"
              >
                <div className="space-y-4">
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <div className="mb-3">
                      <button
                        onClick={() => setParentRender(prev => prev + 1)}
                        className="w-full bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 mb-3"
                      >
                        Force Parent Re-render ({parentRender})
                      </button>
                      
                      <input
                        type="text"
                        value={childData}
                        onChange={(e) => setChildData(e.target.value)}
                        placeholder="Change data for child"
                        className="w-full p-2 border rounded mb-3"
                      />
                    </div>
                    
                    <ExpensiveChild 
                      data={childData}
                      onAction={handleChildAction} // Memoized function
                    />
                    
                    <div className="mt-3 p-2 bg-yellow-100 rounded text-xs">
                      <strong>Tip:</strong> Child only re-renders when data changes, not when parent re-renders!
                    </div>
                  </div>
                  
                  <CodeBlock>
{`const handleChildAction = useCallback(() => {
  console.log('Callback called');
  // Some action
}, []); // Function never changes

// Child component with React.memo
const Child = memo(({ data, onAction }) => {
  return <div onClick={onAction}>{data}</div>;
});`}
                  </CodeBlock>
                </div>
              </HookCard>

              {/* useReducer */}
              <HookCard
                title="useReducer"
                icon={<Settings className="w-6 h-6 text-indigo-500" />}
                description="Complex state logic के लिए, useState का advanced version"
                realLife="🛒 Shopping cart, 📝 Form validation, 🎮 Game state"
              >
                <div className="space-y-4">
                  <div className="bg-indigo-50 p-4 rounded-lg">
                    <div className="text-center mb-4">
                      <div className="text-3xl font-bold text-indigo-600">
                        {counterState.count}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <button
                        onClick={() => dispatch({ type: 'increment' })}
                        className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600"
                      >
                        +1
                      </button>
                      <button
                        onClick={() => dispatch({ type: 'decrement' })}
                        className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
                      >
                        -1
                      </button>
                      <button
                        onClick={() => dispatch({ type: 'multiply', payload: 2 })}
                        className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600"
                      >
                        ×2
                      </button>
                      <button
                        onClick={() => dispatch({ type: 'reset' })}
                        className="bg-gray-500 text-white px-3 py-2 rounded hover:bg-gray-600"
                      >
                        Reset
                      </button>
                    </div>
                    
                    <div className="bg-white p-3 rounded border max-h-32 overflow-y-auto">
                      <div className="text-sm font-medium mb-2">History:</div>
                      {counterState.history.slice(-5).map((entry, index) => (
                        <div key={index} className="text-xs text-gray-600">{entry}</div>
                      ))}
                    </div>
                  </div>
                  
                  <CodeBlock>
{`const [state, dispatch] = useReducer(reducer, initialState);

const reducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'reset':
      return { count: 0 };
    default:
      return state;
  }
};

dispatch({ type: 'increment' });`}
                  </CodeBlock>
                </div>
              </HookCard>

              {/* useRef */}
              <HookCard
                title="useRef"
                icon={<Target className="w-6 h-6 text-red-500" />}
                description="DOM elements को access करने और values store करने के लिए"
                realLife="🔍 Input focus, 📹 Video controls, 📊 Previous values store"
              >
                <div className="space-y-4">
                  <div className="bg-red-50 p-4 rounded-lg">
                    <div className="mb-3">
                      <input
                        ref={inputRef}
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Type something..."
                        className="w-full p-2 border rounded mb-2"
                      />
                      
                      <button
                        onClick={() => inputRef.current.focus()}
                        className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mb-2"
                      >
                        Focus Input (useRef)
                      </button>
                      
                      <div className="text-sm text-gray-600">
                        <div>Input Value: {inputValue}</div>
                        <div>Component Renders: {renderCountRef.current}</div>
                        <div className="text-xs mt-1">
                          useRef doesn't trigger re-renders when changed!
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <CodeBlock>
{`const inputRef = useRef(null);
const renderCount = useRef(0);

// Access DOM element
inputRef.current.focus();

// Store values without re-rendering
renderCount.current = renderCount.current + 1;`}
                  </CodeBlock>
                </div>
              </HookCard>

              {/* useContext */}
              <UseContextExample />
            </div>

            {/* Summary */}
            <div className="mt-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
              <h2 className="text-2xl font-bold mb-4 text-center">🧠 Memory Palace - कभी न भूलने के Tips</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <MemoryTip
                  hook="useState"
                  memory="🎯 State = Target"
                  tip="Component का data store करना हो तो useState"
                />
                
                <MemoryTip
                  hook="useEffect"
                  memory="🔄 Effect = Side Effect"
                  tip="Component के बाहर कुछ करना हो (API, timer) तो useEffect"
                />
                
                <MemoryTip
                  hook="useMemo"
                  memory="🧮 Memo = Memory Calculation"
                  tip="Heavy calculation को save करना हो तो useMemo"
                />
                
                <MemoryTip
                  hook="useCallback"
                  memory="📞 Callback = Function Call Back"
                  tip="Function को save करके child re-render rokna हो तो useCallback"
                />
                
                <MemoryTip
                  hook="useReducer"
                  memory="⚙️ Reducer = State Machine"
                  tip="Complex state logic हो तो useReducer (useState का boss)"
                />
                
                <MemoryTip
                  hook="useRef"
                  memory="👉 Ref = Reference/Pointer"
                  tip="DOM access या value store without re-render तो useRef"
                />
              </div>
              
              <div className="mt-6 text-center">
                <div className="bg-white/20 rounded-lg p-4">
                  <h3 className="font-bold mb-2">🚀 Pro Tips:</h3>
                  <div className="text-sm space-y-1">
                    <div>• <strong>Performance:</strong> useMemo + useCallback + React.memo</div>
                    <div>• <strong>State:</strong> Simple = useState, Complex = useReducer</div>
                    <div>• <strong>Side Effects:</strong> Always useEffect</div>
                    <div>• <strong>DOM Access:</strong> useRef is your friend</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CountContext.Provider>
    </ThemeContext.Provider>
  );
};

// Helper Components
const HookCard = ({ title, icon, description, realLife, children }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-100 hover:border-blue-300 transition-all duration-300 hover:shadow-xl">
      <div className="flex items-center gap-3 mb-4">
        {icon}
        <div>
          <h3 className="text-xl font-bold text-gray-800">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
      
      <div className="bg-blue-50 border-l-4 border-blue-400 p-3 mb-4">
        <div className="text-sm">
          <strong>Real Life Use:</strong> {realLife}
        </div>
      </div>
      
      {children}
    </div>
  );
};

const CodeBlock = ({ children }) => {
  return (
    <div className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm font-mono overflow-x-auto">
      <pre>{children}</pre>
    </div>
  );
};

const MemoryTip = ({ hook, memory, tip }) => {
  return (
    <div className="bg-white/10 rounded-lg p-3 text-center">
      <div className="font-bold text-lg">{hook}</div>
      <div className="text-sm opacity-90 mb-1">{memory}</div>
      <div className="text-xs opacity-75">{tip}</div>
    </div>
  );
};

const UseContextExample = () => {
  const { theme } = useContext(ThemeContext);
  const count = useContext(CountContext);
  
  return (
    <HookCard
      title="useContext"
      icon={<Users className="w-6 h-6 text-green-500" />}
      description="Components के बीच data share करने के लिए (prop drilling avoid)"
      realLife="🌐 Theme, 👤 User info, 🛒 Cart data share करना"
    >
      <div className="space-y-4">
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="text-center mb-3">
            <div className="text-lg font-semibold text-green-600">
              Context Data Access:
            </div>
            <div className="text-sm text-gray-600 mt-2">
              Current Theme: <span className="font-bold">{theme}</span>
            </div>
            <div className="text-sm text-gray-600">
              Current Count: <span className="font-bold">{count}</span>
            </div>
          </div>
          
          <div className="bg-white p-3 rounded border">
            <div className="text-xs text-gray-600">
              <strong>Benefit:</strong> This component can access theme and count without props!
              No prop drilling needed. 🎉
            </div>
          </div>
        </div>
        
        <CodeBlock>
{`// Create Context
const ThemeContext = createContext();

// Provider
<ThemeContext.Provider value={{theme}}>
  <Child />
</ThemeContext.Provider>

// Consumer
const Child = () => {
  const {theme} = useContext(ThemeContext);
  return <div>Theme: {theme}</div>;
};`}
        </CodeBlock>
      </div>
    </HookCard>
  );
};

export default ReactHooksGuide;