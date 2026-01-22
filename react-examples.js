import { useState, useRef } from 'react';

// ============================================================================
// REAL REACT IMPLEMENTATIONS
// Compare these with the vanilla JS versions in the HTML demo
// ============================================================================

// DEMO 1: Counter Component
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ padding: '20px', background: '#f8fafc', borderRadius: '8px', margin: '10px 0' }}>
      <h3 style={{ color: '#1e3c72', marginBottom: '15px' }}>React Counter (Real Implementation)</h3>
      <div style={{ fontSize: '48px', fontWeight: 'bold', textAlign: 'center', margin: '20px 0', color: '#1e3c72' }}>
        {count}
      </div>
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <button 
          onClick={() => setCount(count - 1)}
          style={{ padding: '10px 20px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}
        >
          -1
        </button>
        <button 
          onClick={() => setCount(count + 1)}
          style={{ padding: '10px 20px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}
        >
          +1
        </button>
        <button 
          onClick={() => setCount(0)}
          style={{ padding: '10px 20px', background: '#10b981', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}
        >
          Reset
        </button>
      </div>
      <div style={{ marginTop: '20px', padding: '15px', background: '#dbeafe', borderLeft: '4px solid #3b82f6', borderRadius: '6px' }}>
        <strong style={{ color: '#1e40af' }}>Key Concept:</strong>
        <p style={{ color: '#1e3a8a', margin: '5px 0 0 0' }}>
          <code style={{ background: '#1e293b', color: '#10b981', padding: '2px 6px', borderRadius: '3px' }}>
            setCount(count + 1)
          </code> automatically triggers re-render. No manual DOM updates needed!
        </p>
      </div>
    </div>
  );
}

// DEMO 2: Dynamic List Component
function DynamicList() {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [nextId, setNextId] = useState(1);
  const [renderCount, setRenderCount] = useState(0);
  const inputRef = useRef(null);

  const addItem = () => {
    const text = inputValue.trim();
    if (!text) {
      inputRef.current?.focus();
      return;
    }

    // Immutable state update - creates new array
    setItems([...items, { id: nextId, text }]);
    setNextId(nextId + 1);
    setInputValue('');
    setRenderCount(renderCount + 1);
    inputRef.current?.focus();
  };

  const deleteItem = (id) => {
    // Immutable state update - filter creates new array
    setItems(items.filter(item => item.id !== id));
    setRenderCount(renderCount + 1);
  };

  const clearAll = () => {
    setItems([]);
    setRenderCount(renderCount + 1);
  };

  return (
    <div style={{ padding: '20px', background: '#f8fafc', borderRadius: '8px', margin: '10px 0' }}>
      <h3 style={{ color: '#1e3c72', marginBottom: '15px' }}>React Dynamic List (Real Implementation)</h3>
      
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addItem()}
          placeholder="Enter item..."
          style={{ flex: 1, padding: '10px 15px', border: '2px solid #e2e8f0', borderRadius: '6px', fontSize: '14px' }}
        />
        <button 
          onClick={addItem}
          style={{ padding: '10px 20px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}
        >
          Add
        </button>
        <button 
          onClick={clearAll}
          style={{ padding: '10px 20px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}
        >
          Clear All
        </button>
      </div>

      {items.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '20px', color: '#94a3b8' }}>
          No items yet. Add one above!
        </div>
      ) : (
        <div>
          {items.map(item => (
            <div
              key={item.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 15px',
                background: '#f1f5f9',
                borderRadius: '6px',
                marginBottom: '8px'
              }}
            >
              <span style={{ color: '#2d3748' }}>{item.text}</span>
              <button
                onClick={() => deleteItem(item.id)}
                style={{
                  padding: '6px 12px',
                  background: '#fc8181',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '12px',
                  cursor: 'pointer'
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px', marginTop: '20px' }}>
        <div style={{ background: 'white', padding: '15px', borderRadius: '8px', borderLeft: '4px solid #3b82f6' }}>
          <div style={{ fontSize: '12px', color: '#64748b', textTransform: 'uppercase', fontWeight: '600' }}>Total Items</div>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b', marginTop: '5px' }}>{items.length}</div>
        </div>
        <div style={{ background: 'white', padding: '15px', borderRadius: '8px', borderLeft: '4px solid #10b981' }}>
          <div style={{ fontSize: '12px', color: '#64748b', textTransform: 'uppercase', fontWeight: '600' }}>Renders</div>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b', marginTop: '5px' }}>{renderCount}</div>
        </div>
      </div>

      <div style={{ marginTop: '20px', padding: '15px', background: '#dbeafe', borderLeft: '4px solid #3b82f6', borderRadius: '6px' }}>
        <strong style={{ color: '#1e40af' }}>Key Concept - The "key" Prop:</strong>
        <p style={{ color: '#1e3a8a', margin: '5px 0 0 0', fontSize: '14px' }}>
          Notice <code style={{ background: '#1e293b', color: '#10b981', padding: '2px 6px', borderRadius: '3px' }}>key={'{'}item.id{'}'}</code> in the map function. 
          This helps React identify which items changed, enabling efficient reconciliation. Without keys, React would re-render ALL items when adding/deleting one.
        </p>
      </div>
    </div>
  );
}

// DEMO 3: Controlled Inputs Component
function ControlledInputs() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subscribe: false
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const updateField = (field, value) => {
    setFormState({ ...formState, [field]: value });
  };

  return (
    <div style={{ padding: '20px', background: '#f8fafc', borderRadius: '8px', margin: '10px 0' }}>
      <h3 style={{ color: '#1e3c72', marginBottom: '15px' }}>React Controlled Inputs (Real Implementation)</h3>
      
      <div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600', color: '#475569' }}>Name:</label>
          <input
            type="text"
            value={formState.name}
            onChange={(e) => updateField('name', e.target.value)}
            style={{ width: '100%', padding: '10px 15px', border: '2px solid #e2e8f0', borderRadius: '6px', fontSize: '14px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600', color: '#475569' }}>Email:</label>
          <input
            type="email"
            value={formState.email}
            onChange={(e) => updateField('email', e.target.value)}
            style={{ width: '100%', padding: '10px 15px', border: '2px solid #e2e8f0', borderRadius: '6px', fontSize: '14px' }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '15px' }}>
          <input
            type="checkbox"
            checked={formState.subscribe}
            onChange={(e) => updateField('subscribe', e.target.checked)}
            style={{ width: '20px', height: '20px', cursor: 'pointer' }}
          />
          <label style={{ fontWeight: '600', color: '#475569' }}>Subscribe to newsletter</label>
        </div>

        <button 
          onClick={handleSubmit}
          style={{ padding: '10px 20px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}
        >
          Submit
        </button>
      </div>

      <div style={{ marginTop: '20px', padding: '15px', background: '#d1fae5', borderLeft: '4px solid #10b981', borderRadius: '6px' }}>
        <strong style={{ color: '#065f46' }}>Current State (Live Updates):</strong>
        <p style={{ color: '#065f46', margin: '5px 0', fontSize: '14px' }}>
          <strong>Name:</strong> {formState.name || '(empty)'}
        </p>
        <p style={{ color: '#065f46', margin: '5px 0', fontSize: '14px' }}>
          <strong>Email:</strong> {formState.email || '(empty)'}
        </p>
        <p style={{ color: '#065f46', margin: '5px 0', fontSize: '14px' }}>
          <strong>Subscribed:</strong> {formState.subscribe ? 'Yes' : 'No'}
        </p>
      </div>

      {submitted && (
        <div style={{ marginTop: '15px', padding: '15px', background: '#dbeafe', borderLeft: '4px solid #3b82f6', borderRadius: '6px' }}>
          <strong style={{ color: '#1e40af' }}>✓ Form Submitted!</strong>
          <p style={{ color: '#1e3a8a', margin: '5px 0 0 0', fontSize: '14px' }}>
            Data: {JSON.stringify(formState)}
          </p>
        </div>
      )}

      <div style={{ marginTop: '20px', padding: '15px', background: '#fee2e2', borderLeft: '4px solid #ef4444', borderRadius: '6px' }}>
        <strong style={{ color: '#991b1b' }}>Key Concept - Controlled Components:</strong>
        <p style={{ color: '#991b1b', margin: '5px 0 0 0', fontSize: '14px' }}>
          The input values are driven by state (<code style={{ background: '#1e293b', color: '#10b981', padding: '2px 6px', borderRadius: '3px' }}>value={'{'}formState.name{'}'}</code>).
          Every keystroke updates state via <code style={{ background: '#1e293b', color: '#10b981', padding: '2px 6px', borderRadius: '3px' }}>onChange</code>.
          State is the single source of truth!
        </p>
      </div>
    </div>
  );
}

// DEMO 4: Event Delegation Example
function EventDelegation() {
  const [buttons, setButtons] = useState([]);
  const [clickCount, setClickCount] = useState(0);

  const addButtons = () => {
    const newButtons = [];
    for (let i = 0; i < 10; i++) {
      newButtons.push({ id: Date.now() + i, label: `Button ${buttons.length + i + 1}` });
    }
    setButtons([...buttons, ...newButtons]);
  };

  const handleClick = (id) => {
    setClickCount(clickCount + 1);
  };

  return (
    <div style={{ padding: '20px', background: '#f8fafc', borderRadius: '8px', margin: '10px 0' }}>
      <h3 style={{ color: '#1e3c72', marginBottom: '15px' }}>React Event Delegation (Real Implementation)</h3>
      
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button 
          onClick={addButtons}
          style={{ padding: '10px 20px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}
        >
          Add 10 Buttons
        </button>
        <button 
          onClick={() => setButtons([])}
          style={{ padding: '10px 20px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}
        >
          Remove All
        </button>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '20px' }}>
        {buttons.map(btn => (
          <button
            key={btn.id}
            onClick={() => handleClick(btn.id)}
            style={{
              padding: '8px 16px',
              background: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '13px'
            }}
          >
            {btn.label}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
        <div style={{ background: 'white', padding: '15px', borderRadius: '8px', borderLeft: '4px solid #3b82f6' }}>
          <div style={{ fontSize: '12px', color: '#64748b', textTransform: 'uppercase', fontWeight: '600' }}>Root Listeners</div>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b', marginTop: '5px' }}>1</div>
        </div>
        <div style={{ background: 'white', padding: '15px', borderRadius: '8px', borderLeft: '4px solid #10b981' }}>
          <div style={{ fontSize: '12px', color: '#64748b', textTransform: 'uppercase', fontWeight: '600' }}>Click Count</div>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b', marginTop: '5px' }}>{clickCount}</div>
        </div>
      </div>

      <div style={{ marginTop: '20px', padding: '15px', background: '#dbeafe', borderLeft: '4px solid #3b82f6', borderRadius: '6px' }}>
        <strong style={{ color: '#1e40af' }}>Key Concept - Synthetic Events:</strong>
        <p style={{ color: '#1e3a8a', margin: '5px 0 0 0', fontSize: '14px' }}>
          React uses event delegation internally. Even with {buttons.length} buttons, there's only ONE real event listener at the root.
          React's synthetic event system routes clicks to the correct handler. Memory efficient + automatic cleanup!
        </p>
      </div>
    </div>
  );
}

// DEMO 5: State Synchronization Guarantee
function StateSynchronization() {
  const [value, setValue] = useState(0);
  const [updateHistory, setUpdateHistory] = useState([]);

  const updateState = () => {
    const newValue = value + 10;
    setValue(newValue);
    setUpdateHistory([...updateHistory, `Updated to ${newValue} at ${new Date().toLocaleTimeString()}`]);
  };

  const multipleUpdates = () => {
    setValue(prev => prev + 15);
    setUpdateHistory([...updateHistory, `Batched updates at ${new Date().toLocaleTimeString()}`]);
  };

  return (
    <div style={{ padding: '20px', background: '#f8fafc', borderRadius: '8px', margin: '10px 0' }}>
      <h3 style={{ color: '#1e3c72', marginBottom: '15px' }}>React State Synchronization (Real Implementation)</h3>
      
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button 
          onClick={updateState}
          style={{ padding: '10px 20px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}
        >
          Update State
        </button>
        <button 
          onClick={multipleUpdates}
          style={{ padding: '10px 20px', background: '#10b981', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}
        >
          Update +15
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px', marginBottom: '20px' }}>
        <div style={{ background: 'white', padding: '15px', borderRadius: '8px', borderLeft: '4px solid #3b82f6' }}>
          <div style={{ fontSize: '12px', color: '#64748b', textTransform: 'uppercase', fontWeight: '600' }}>State Value</div>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b', marginTop: '5px' }}>{value}</div>
        </div>
        <div style={{ background: 'white', padding: '15px', borderRadius: '8px', borderLeft: '4px solid #10b981' }}>
          <div style={{ fontSize: '12px', color: '#64748b', textTransform: 'uppercase', fontWeight: '600' }}>UI Value</div>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b', marginTop: '5px' }}>{value}</div>
        </div>
      </div>

      <div style={{ marginTop: '20px', padding: '15px', background: '#d1fae5', borderLeft: '4px solid #10b981', borderRadius: '6px' }}>
        <strong style={{ color: '#065f46' }}>✓ Always Synchronized</strong>
        <p style={{ color: '#065f46', margin: '5px 0 0 0', fontSize: '14px' }}>
          State and UI are ALWAYS in sync. It's mathematically impossible for them to diverge because UI = f(state).
        </p>
      </div>

      {updateHistory.length > 0 && (
        <div style={{ marginTop: '15px', background: '#1e293b', padding: '15px', borderRadius: '8px', maxHeight: '150px', overflowY: 'auto' }}>
          <div style={{ fontSize: '12px', color: '#10b981', fontWeight: '600', marginBottom: '10px' }}>Update History:</div>
          {updateHistory.map((entry, i) => (
            <div key={i} style={{ color: '#10b981', fontSize: '12px', fontFamily: 'monospace', marginBottom: '5px' }}>
              {entry}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Main App Component - Tabbed Interface
export default function ReactComparison() {
  const [activeTab, setActiveTab] = useState('counter');

  const tabs = [
    { id: 'counter', label: 'Counter', component: Counter },
    { id: 'list', label: 'Dynamic List', component: DynamicList },
    { id: 'inputs', label: 'Controlled Inputs', component: ControlledInputs },
    { id: 'events', label: 'Event Delegation', component: EventDelegation },
    { id: 'state', label: 'State Sync', component: StateSynchronization }
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || Counter;

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)', padding: '40px 20px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <header style={{ textAlign: 'center', color: 'white', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '42px', marginBottom: '10px', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
            ⚛️ React Examples - Real Implementation
          </h1>
          <p style={{ fontSize: '18px', opacity: 0.9 }}>
            Compare these with the Vanilla JS versions in the main demo
          </p>
        </header>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '30px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '12px 24px',
                background: activeTab === tab.id ? 'white' : 'rgba(255,255,255,0.1)',
                color: activeTab === tab.id ? '#1e3c72' : 'white',
                border: `2px solid ${activeTab === tab.id ? 'white' : 'rgba(255,255,255,0.3)'}`,
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: '600',
                backdropFilter: 'blur(10px)'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div style={{ background: 'white', borderRadius: '16px', padding: '30px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
          <ActiveComponent />
        </div>

        <div style={{ marginTop: '30px', padding: '20px', background: 'rgba(255,255,255,0.1)', borderRadius: '12px', backdropFilter: 'blur(10px)' }}>
          <p style={{ color: 'white', fontSize: '14px', textAlign: 'center', margin: 0 }}>
            💡 <strong>Note:</strong> These are ACTUAL React components using hooks. Compare the code simplicity with the vanilla JS versions!
          </p>
        </div>
      </div>
    </div>
  );
}