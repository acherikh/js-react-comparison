// ============================================================================
// DOM vs REACT: COMPLETE COMPARISON DEMOS
// This file contains all implementations for both Vanilla JS and React-style
// ============================================================================

// ============================================================================
// NAVIGATION SYSTEM
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
  const navButtons = document.querySelectorAll('.nav-tabs button');
  const demoSections = document.querySelectorAll('.demo-section');

  navButtons.forEach(button => {
    button.addEventListener('click', () => {
      const demoId = button.dataset.demo;
      
      // Update active states
      navButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      demoSections.forEach(section => {
        section.classList.remove('active');
      });
      
      document.getElementById(demoId).classList.add('active');
    });
  });

  // Initialize all demos
  initCounterDemo();
  initListDemo();
  initFormDemo();
  initReflowDemo();
  initEventsDemo();
  initStateDemo();
});

// ============================================================================
// DEMO 1: COUNTER - State Updates
// Demonstrates how state changes trigger UI updates
// ============================================================================
function initCounterDemo() {
  // VANILLA JS COUNTER - Imperative approach
  let vanillaCount = 0;
  const vanillaCountDisplay = document.getElementById('vanillaCount');
  const vanillaIncBtn = document.getElementById('vanillaIncrement');
  const vanillaDecBtn = document.getElementById('vanillaDecrement');
  const vanillaResetBtn = document.getElementById('vanillaReset');

  // Manual render function - WE must explicitly update the DOM
  function renderVanillaCounter() {
    vanillaCountDisplay.textContent = vanillaCount;
  }

  vanillaIncBtn.addEventListener('click', () => {
    vanillaCount++; // Update state
    renderVanillaCounter(); // Manually sync UI
  });

  vanillaDecBtn.addEventListener('click', () => {
    vanillaCount--;
    renderVanillaCounter();
  });

  vanillaResetBtn.addEventListener('click', () => {
    vanillaCount = 0;
    renderVanillaCounter();
  });

  // REACT-STYLE COUNTER - Declarative approach
  // Simulating React's automatic re-rendering
  let reactCount = 0;
  const reactCountDisplay = document.getElementById('reactCount');
  const reactIncBtn = document.getElementById('reactIncrement');
  const reactDecBtn = document.getElementById('reactDecrement');
  const reactResetBtn = document.getElementById('reactReset');

  // Simulating setState - automatically triggers render
  function setReactCount(newValue) {
    reactCount = newValue;
    renderReactCounter(); // In real React, this happens automatically
  }

  function renderReactCounter() {
    // In real React, this would be the entire component re-rendering
    reactCountDisplay.textContent = reactCount;
  }

  reactIncBtn.addEventListener('click', () => {
    setReactCount(reactCount + 1); // State update auto-triggers render
  });

  reactDecBtn.addEventListener('click', () => {
    setReactCount(reactCount - 1);
  });

  reactResetBtn.addEventListener('click', () => {
    setReactCount(0);
  });

  renderReactCounter();
}

// ============================================================================
// DEMO 2: DYNAMIC LIST - DOM Manipulation vs Reconciliation
// Shows the difference in how lists are managed
// ============================================================================
function initListDemo() {
  // VANILLA JS LIST - Manual DOM manipulation
  let vanillaItems = [];
  let vanillaNextId = 1;
  let vanillaDomOperations = 0;

  const vanillaInput = document.getElementById('vanillaInput');
  const vanillaAddBtn = document.getElementById('vanillaAdd');
  const vanillaClearBtn = document.getElementById('vanillaClear');
  const vanillaListContainer = document.getElementById('vanillaList');
  const vanillaCountDisplay = document.getElementById('vanillaListCount');
  const vanillaDomOpsDisplay = document.getElementById('vanillaDomOps');

  function renderVanillaList() {
    // CRITICAL: We clear and rebuild the ENTIRE list on every change
    vanillaListContainer.innerHTML = ''; // DOM operation
    vanillaDomOperations++;

    vanillaCountDisplay.textContent = vanillaItems.length;
    vanillaDomOpsDisplay.textContent = vanillaDomOperations;

    if (vanillaItems.length === 0) {
      const empty = document.createElement('div');
      empty.style.textAlign = 'center';
      empty.style.padding = '20px';
      empty.style.color = '#94a3b8';
      empty.textContent = 'No items yet';
      vanillaListContainer.appendChild(empty);
      vanillaDomOperations++;
      return;
    }

    // Rebuild every single item from scratch
    vanillaItems.forEach(item => {
      const itemDiv = document.createElement('div');
      itemDiv.className = 'list-item';
      
      const textSpan = document.createElement('span');
      textSpan.textContent = item.text;
      
      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'btn btn-danger';
      deleteBtn.textContent = 'Delete';
      deleteBtn.style.padding = '6px 12px';
      deleteBtn.style.fontSize = '12px';
      
      // Each item gets its own event listener
      deleteBtn.addEventListener('click', () => {
        deleteVanillaItem(item.id);
      });
      
      itemDiv.appendChild(textSpan);
      itemDiv.appendChild(deleteBtn);
      vanillaListContainer.appendChild(itemDiv);
      
      vanillaDomOperations += 4; // createElement x3 + appendChild x3
    });

    vanillaDomOpsDisplay.textContent = vanillaDomOperations;
  }

  function addVanillaItem() {
    const text = vanillaInput.value.trim();
    if (!text) return;

    vanillaItems.push({ id: vanillaNextId++, text });
    vanillaInput.value = '';
    renderVanillaList(); // Full re-render
  }

  function deleteVanillaItem(id) {
    vanillaItems = vanillaItems.filter(item => item.id !== id);
    renderVanillaList(); // Full re-render again
  }

  vanillaAddBtn.addEventListener('click', addVanillaItem);
  vanillaInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addVanillaItem();
  });
  vanillaClearBtn.addEventListener('click', () => {
    vanillaItems = [];
    renderVanillaList();
  });

  renderVanillaList();

  // REACT-STYLE LIST - Simulating Virtual DOM reconciliation
  let reactItems = [];
  let reactNextId = 1;
  let reactRenderCount = 0;

  const reactInput = document.getElementById('reactInput');
  const reactAddBtn = document.getElementById('reactAdd');
  const reactClearBtn = document.getElementById('reactClear');
  const reactListContainer = document.getElementById('reactList');
  const reactCountDisplay = document.getElementById('reactListCount');
  const reactRendersDisplay = document.getElementById('reactRenders');

  // Simulating React's reconciliation with keys
  function renderReactList() {
    reactRenderCount++;
    reactRendersDisplay.textContent = reactRenderCount;
    reactCountDisplay.textContent = reactItems.length;

    if (reactItems.length === 0) {
      reactListContainer.innerHTML = `
        <div style="text-align: center; padding: 20px; color: #94a3b8;">
          No items yet
        </div>
      `;
      return;
    }

    // In real React, this would use the VDOM and only update changed nodes
    // We simulate by tracking which items are new vs existing
    const existingElements = new Map();
    Array.from(reactListContainer.children).forEach(el => {
      const key = el.dataset.key;
      if (key) existingElements.set(key, el);
    });

    reactListContainer.innerHTML = '';

    reactItems.forEach(item => {
      const key = `item-${item.id}`;
      
      // Check if this element already exists (simulating reconciliation)
      let itemDiv = existingElements.get(key);
      
      if (!itemDiv) {
        // New item - create it (like React would)
        itemDiv = document.createElement('div');
        itemDiv.className = 'list-item';
        itemDiv.dataset.key = key;
        
        const textSpan = document.createElement('span');
        textSpan.textContent = item.text;
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn btn-danger';
        deleteBtn.textContent = 'Delete';
        deleteBtn.style.padding = '6px 12px';
        deleteBtn.style.fontSize = '12px';
        deleteBtn.onclick = () => deleteReactItem(item.id);
        
        itemDiv.appendChild(textSpan);
        itemDiv.appendChild(deleteBtn);
      }
      
      reactListContainer.appendChild(itemDiv);
    });
  }

  function setReactItems(newItems) {
    reactItems = newItems;
    renderReactList(); // Automatic re-render
  }

  function addReactItem() {
    const text = reactInput.value.trim();
    if (!text) return;

    // Immutable update - create new array
    setReactItems([...reactItems, { id: reactNextId++, text }]);
    reactInput.value = '';
  }

  function deleteReactItem(id) {
    // Immutable update - filter creates new array
    setReactItems(reactItems.filter(item => item.id !== id));
  }

  reactAddBtn.addEventListener('click', addReactItem);
  reactInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addReactItem();
  });
  reactClearBtn.addEventListener('click', () => {
    setReactItems([]);
  });

  renderReactList();
}

// ============================================================================
// DEMO 3: FORM HANDLING - Controlled vs Uncontrolled
// Shows the difference between controlled and uncontrolled inputs
// ============================================================================
function initFormDemo() {
  // VANILLA JS FORM - Uncontrolled inputs
  const vanillaForm = document.getElementById('vanillaForm');
  const vanillaName = document.getElementById('vanillaName');
  const vanillaEmail = document.getElementById('vanillaEmail');
  const vanillaSubscribe = document.getElementById('vanillaSubscribe');
  const vanillaOutput = document.getElementById('vanillaFormOutput');
  const vanillaDataDisplay = document.getElementById('vanillaFormData');

  vanillaForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Read values directly from DOM when needed
    const formData = {
      name: vanillaName.value,
      email: vanillaEmail.value,
      subscribe: vanillaSubscribe.checked
    };

    vanillaOutput.style.display = 'block';
    vanillaDataDisplay.innerHTML = `
      <p style="color: #1e3a8a; margin: 5px 0;"><strong>Name:</strong> ${formData.name}</p>
      <p style="color: #1e3a8a; margin: 5px 0;"><strong>Email:</strong> ${formData.email}</p>
      <p style="color: #1e3a8a; margin: 5px 0;"><strong>Subscribed:</strong> ${formData.subscribe}</p>
    `;
  });

  // REACT-STYLE FORM - Controlled components
  // State drives the input values
  let reactFormState = {
    name: '',
    email: '',
    subscribe: false
  };

  const reactForm = document.getElementById('reactForm');
  const reactName = document.getElementById('reactName');
  const reactEmail = document.getElementById('reactEmail');
  const reactSubscribe = document.getElementById('reactSubscribe');
  const reactDataDisplay = document.getElementById('reactFormData');

  function updateReactFormState(field, value) {
    reactFormState = { ...reactFormState, [field]: value };
    renderReactForm();
  }

  function renderReactForm() {
    // In React, input values are controlled by state
    reactName.value = reactFormState.name;
    reactEmail.value = reactFormState.email;
    reactSubscribe.checked = reactFormState.subscribe;

    // Live display of current state
    reactDataDisplay.innerHTML = `
      <p style="color: #1e3a8a; margin: 5px 0;"><strong>Name:</strong> ${reactFormState.name || '(empty)'}</p>
      <p style="color: #1e3a8a; margin: 5px 0;"><strong>Email:</strong> ${reactFormState.email || '(empty)'}</p>
      <p style="color: #1e3a8a; margin: 5px 0;"><strong>Subscribed:</strong> ${reactFormState.subscribe}</p>
    `;
  }

  // Controlled inputs - state controls the value
  reactName.addEventListener('input', (e) => {
    updateReactFormState('name', e.target.value);
  });

  reactEmail.addEventListener('input', (e) => {
    updateReactFormState('email', e.target.value);
  });

  reactSubscribe.addEventListener('change', (e) => {
    updateReactFormState('subscribe', e.target.checked);
  });

  reactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert(`Form submitted with state:\n${JSON.stringify(reactFormState, null, 2)}`);
  });

  renderReactForm();
}

// ============================================================================
// DEMO 4: REFLOW PERFORMANCE - Batching Updates
// Demonstrates the performance impact of batched vs unbatched updates
// ============================================================================
function initReflowDemo() {
  // VANILLA JS - Unbatched updates (causes multiple reflows)
  const vanillaIterationsInput = document.getElementById('vanillaIterations');
  const vanillaBenchmarkBtn = document.getElementById('vanillaBenchmark');
  const vanillaContainer = document.getElementById('vanillaReflowContainer');
  const vanillaTimeDisplay = document.getElementById('vanillaTime');
  const vanillaReflowsDisplay = document.getElementById('vanillaReflows');
  const vanillaLog = document.getElementById('vanillaLog');

  vanillaBenchmarkBtn.addEventListener('click', () => {
    const iterations = parseInt(vanillaIterationsInput.value);
    vanillaContainer.innerHTML = '';
    vanillaLog.innerHTML = '';

    let log = (msg) => {
      const div = document.createElement('div');
      div.textContent = msg;
      vanillaLog.appendChild(div);
    };

    log(`Starting ${iterations} individual DOM operations...`);
    const startTime = performance.now();

    // ANTI-PATTERN: Each appendChild causes a potential reflow
    for (let i = 0; i < iterations; i++) {
      const div = document.createElement('div');
      div.textContent = `Item ${i + 1}`;
      div.style.padding = '8px';
      div.style.background = '#f1f5f9';
      div.style.marginBottom = '4px';
      div.style.borderRadius = '4px';
      
      vanillaContainer.appendChild(div); // REFLOW happens here!
      const height = vanillaContainer.offsetHeight;
    }

    const endTime = performance.now();
    const duration = (endTime - startTime).toFixed(2);

    vanillaTimeDisplay.textContent = `${duration}ms`;
    vanillaReflowsDisplay.textContent = iterations;
    
    log(`Completed in ${duration}ms`);
    log(`Each appendChild triggered a potential reflow`);
    log(`Total: ${iterations} reflows`);
  });

  // REACT-STYLE - Batched updates (single reflow)
  const reactIterationsInput = document.getElementById('reactIterations');
  const reactBenchmarkBtn = document.getElementById('reactBenchmark');
  const reactContainer = document.getElementById('reactReflowContainer');
  const reactTimeDisplay = document.getElementById('reactTime');
  const reactBatchesDisplay = document.getElementById('reactBatches');
  const reactLog = document.getElementById('reactLog');

  reactBenchmarkBtn.addEventListener('click', () => {
    const iterations = parseInt(reactIterationsInput.value);
    reactContainer.innerHTML = '';
    reactLog.innerHTML = '';

    let log = (msg) => {
      const div = document.createElement('div');
      div.textContent = msg;
      reactLog.appendChild(div);
    };

    log(`Starting ${iterations} operations with batching...`);
    const startTime = performance.now();

    // BEST PRACTICE: Use DocumentFragment to batch insertions
    const fragment = document.createDocumentFragment();
    
    for (let i = 0; i < iterations; i++) {
      const div = document.createElement('div');
      div.textContent = `Item ${i + 1}`;
      div.style.padding = '8px';
      div.style.background = '#f1f5f9';
      div.style.marginBottom = '4px';
      div.style.borderRadius = '4px';
      
      fragment.appendChild(div); // No reflow - fragment is in memory
    }
    
    reactContainer.appendChild(fragment); // SINGLE REFLOW!

    const endTime = performance.now();
    const duration = (endTime - startTime).toFixed(2);

    reactTimeDisplay.textContent = `${duration}ms`;
    reactBatchesDisplay.textContent = '1';
    
    log(`Completed in ${duration}ms`);
    log(`All operations batched into DocumentFragment`);
    log(`Single appendChild to DOM = 1 reflow`);
    log(`Performance improvement: ${(iterations)} → 1 reflow`);
  });
}

// ============================================================================
// DEMO 5: EVENT HANDLING - Direct Listeners vs Event Delegation
// Shows memory and performance differences
// ============================================================================
function initEventsDemo() {
  // VANILLA JS - Direct event listeners on each element
  let vanillaListeners = 0;
  let vanillaClickCount = 0;
  const vanillaListenersDisplay = document.getElementById('vanillaListeners');
  const vanillaClicksDisplay = document.getElementById('vanillaClicks');
  const vanillaButtonContainer = document.getElementById('vanillaButtonContainer');
  const vanillaAddBtn = document.getElementById('vanillaAddButtons');
  const vanillaRemoveBtn = document.getElementById('vanillaRemoveButtons');

  // Store references to clean up listeners
  const vanillaEventHandlers = new Map();

  vanillaAddBtn.addEventListener('click', () => {
    for (let i = 0; i < 10; i++) {
      const btn = document.createElement('button');
      btn.className = 'btn btn-primary';
      btn.textContent = `Button ${vanillaListeners + 1}`;
      btn.style.margin = '5px';
      btn.style.padding = '8px 16px';
      btn.style.fontSize = '13px';
      
      // Each button gets its own event listener
      const handler = () => {
        vanillaClickCount++;
        vanillaClicksDisplay.textContent = vanillaClickCount;
        btn.style.background = '#10b981';
        setTimeout(() => {
          btn.style.background = '#3b82f6';
        }, 200);
      };
      
      btn.addEventListener('click', handler);
      vanillaEventHandlers.set(btn, handler);
      
      vanillaButtonContainer.appendChild(btn);
      vanillaListeners++;
    }
    
    vanillaListenersDisplay.textContent = vanillaListeners;
  });

  vanillaRemoveBtn.addEventListener('click', () => {
    // CRITICAL: Must manually remove event listeners
    Array.from(vanillaButtonContainer.children).forEach(btn => {
      const handler = vanillaEventHandlers.get(btn);
      if (handler) {
        btn.removeEventListener('click', handler);
        vanillaEventHandlers.delete(btn);
      }
    });
    
    vanillaButtonContainer.innerHTML = '';
    vanillaListeners = 0;
    vanillaListenersDisplay.textContent = vanillaListeners;
  });

  // REACT-STYLE - Event delegation (single root listener)
  let reactClickCount = 0;
  let reactButtonCount = 0;
  const reactClicksDisplay = document.getElementById('reactClicks');
  const reactButtonContainer = document.getElementById('reactButtonContainer');
  const reactAddBtn = document.getElementById('reactAddButtons');
  const reactRemoveBtn = document.getElementById('reactRemoveButtons');

  // Single delegated event listener at the container level
  reactButtonContainer.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON' && e.target.classList.contains('delegate-btn')) {
      reactClickCount++;
      reactClicksDisplay.textContent = reactClickCount;
      e.target.style.background = '#10b981';
      setTimeout(() => {
        e.target.style.background = '#3b82f6';
      }, 200);
    }
  });

  reactAddBtn.addEventListener('click', () => {
    for (let i = 0; i < 10; i++) {
      const btn = document.createElement('button');
      btn.className = 'btn btn-primary delegate-btn';
      btn.textContent = `Button ${reactButtonCount + 1}`;
      btn.style.margin = '5px';
      btn.style.padding = '8px 16px';
      btn.style.fontSize = '13px';
      
      // No individual event listener needed!
      reactButtonContainer.appendChild(btn);
      reactButtonCount++;
    }
  });

  reactRemoveBtn.addEventListener('click', () => {
    // No manual listener cleanup needed - delegation handles it
    reactButtonContainer.innerHTML = '';
    reactButtonCount = 0;
  });
}

// ============================================================================
// DEMO 6: STATE MANAGEMENT - Synchronization Issues
// Shows how state and UI can become desynchronized
// ============================================================================
function initStateDemo() {
  // VANILLA JS - State and UI are separate
  let vanillaState = 0;
  let vanillaUI = 0;
  
  const vanillaStateDisplay = document.getElementById('vanillaStateValue');
  const vanillaUIDisplay = document.getElementById('vanillaUIValue');
  const vanillaWarning = document.getElementById('vanillaStateWarning');
  
  const vanillaUpdateStateBtn = document.getElementById('vanillaUpdateState');
  const vanillaUpdateUIBtn = document.getElementById('vanillaUpdateUI');
  const vanillaSyncBtn = document.getElementById('vanillaSync');

  function checkVanillaSync() {
    if (vanillaState !== vanillaUI) {
      vanillaWarning.style.display = 'block';
    } else {
      vanillaWarning.style.display = 'none';
    }
  }

  // Updates state but forgets to update UI - BUG!
  vanillaUpdateStateBtn.addEventListener('click', () => {
    vanillaState += 10;
    vanillaStateDisplay.textContent = vanillaState;
    // OOPS - forgot to update vanillaUI!
    checkVanillaSync();
  });

  // Updates UI but forgets to update state - BUG!
  vanillaUpdateUIBtn.addEventListener('click', () => {
    vanillaUI += 5;
    vanillaUIDisplay.textContent = vanillaUI;
    // OOPS - forgot to update vanillaState!
    checkVanillaSync();
  });

  // Manually synchronize
  vanillaSyncBtn.addEventListener('click', () => {
    vanillaUI = vanillaState;
    vanillaUIDisplay.textContent = vanillaUI;
    checkVanillaSync();
  });

  vanillaStateDisplay.textContent = vanillaState;
  vanillaUIDisplay.textContent = vanillaUI;

  // REACT-STYLE - State and UI are always synchronized
  let reactState = 0;
  
  const reactStateDisplay = document.getElementById('reactStateValue');
  const reactUIDisplay = document.getElementById('reactUIValue');
  
  const reactUpdateStateBtn = document.getElementById('reactUpdateState');
  const reactMultiUpdateBtn = document.getElementById('reactMultiUpdate');

  function setReactState(newValue) {
    reactState = newValue;
    // Automatic synchronization - UI always reflects state
    reactStateDisplay.textContent = reactState;
    reactUIDisplay.textContent = reactState; // Always same!
  }

  reactUpdateStateBtn.addEventListener('click', () => {
    setReactState(reactState + 10);
    // State and UI automatically in sync!
  });

  reactMultiUpdateBtn.addEventListener('click', () => {
    // Multiple state updates
    setReactState(reactState + 5);
    setReactState(reactState + 5);
    setReactState(reactState + 5);
    // In real React, these would be batched
  });

  setReactState(0);
}

// ============================================================================
// UTILITY: Add some console logging for educational purposes
// ============================================================================
console.log('%c🎯 DOM vs React Comparison Demos Loaded', 'color: #3b82f6; font-size: 16px; font-weight: bold;');
console.log('%cExplore the demos to understand the differences between imperative and declarative programming!', 'color: #64748b;');