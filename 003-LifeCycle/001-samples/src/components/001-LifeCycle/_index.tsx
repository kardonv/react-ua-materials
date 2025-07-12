import React, { useRef, useState } from 'react';

import ClassComponentLifeCycle from './001-ClassComponentLifeCycle';
import GetDerivedStateFromProps from './002-GetDerivedStateFromProps';
import GetDerivedStateFromPropsProblem from './003-GetDerivedStateFromPopsProblem';
import ComponentDidMount from './004-ComponentDidMount';
import ShouldComponentUpdate from './005-ShouldComponentUpdate';
import GetSnapshotBeforeUpdate from './006-GetSnapshotBeforeUpdate';
import UseEffectAfterRender from './007-UseEffectAfterRender';
import UseEffectNoEffect from './008-UseEffectNoEffect';
import UseEffectOnDepsChange from './009-UseEffectOnDepsChange';
import UseEffectCleanup from './010-UseEffectCleanup';
import UseEffectCombo from './011-UseEffectCombo';
import UseEffectMultiple from './012-UseEffectMultiple';
import UseEffectDOM from './013-UseEffectDOM';
import UseEffectNested from './014-UseEffectNested';
import UseEffectWillUnmount from './015-UseEffectWillUnmount';
import UseEffectAsync from './016-UseEffectAsync';

import { Routes, Route, Link } from 'react-router-dom';

function LifeCycleIndex() {

    const [value, setValue] = useState(2);
    const [state, setState] = useState(0);
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState<string[]>([]);

    return (
        <div style={{ padding: '6px' }}>
            <h2>Життєвий цикл компонентів</h2>
            <nav style={{ padding: '12px' }}>
                <Link to="/lifecycle/class">1.1 ClassComponentLifeCycle</Link> <br />
                <Link to="/lifecycle/derived">1.2 GetDerivedStateFromProps</Link> <br />
                <Link to="/lifecycle/problem">1.3 GetDerivedStateFromPropsProblem</Link> <br />
                <Link to="/lifecycle/mount">1.4 ComponentDidMount</Link> <br />
                <Link to="/lifecycle/should">1.5 ShouldComponentUpdate</Link> <br />
                <Link to="/lifecycle/snapshot">1.6 GetSnapshotBeforeUpdate</Link> <br />
                <Link to="/lifecycle/useeffect7">1.7 UseEffectAfterRender</Link> <br />
                <Link to="/lifecycle/useeffect8">1.8 UseEffectNoEffect</Link> <br />
                <Link to="/lifecycle/useeffect9">1.9 UseEffectOnDepsChange</Link> <br />
                <Link to="/lifecycle/useeffect10">1.10 UseEffectCleanup</Link> <br />
                <Link to="/lifecycle/useeffect11">1.11 UseEffectCombo</Link> <br />
                <Link to="/lifecycle/useeffect12">1.12 UseEffectMultiple</Link> <br />
                <Link to="/lifecycle/useeffect13">1.13 UseEffectDOM</Link> <br />
                <Link to="/lifecycle/useeffect14">1.14 UseEffectNested</Link> <br />
                <Link to="/lifecycle/useeffect15">1.15 UseEffectWillUnmount</Link> <br />
                <Link to="/lifecycle/useeffect16">1.16 UseEffectAsync</Link>
            </nav>
            <section style={{ padding: '3px' }}>
                <button onClick={() => setValue(value + 1)}>Change Value</button> | {' '}
                <button onClick={() => setState(state + 1)}>Change state</button> <br />
                <br />
                <input type='text' value={inputValue} onChange={(e) => setInputValue(e.target.value)} /> | {' '}
                <button onClick={() => {
                    // setInputValue(inputValue + 1);
                    setMessages([...messages, inputValue])
                }}>Set Input Value</button>
            </section>
            <Routes>
                <Route path="class" element={<ClassComponentLifeCycle />} />
                <Route path="derived" element={<GetDerivedStateFromProps value={value} />} />
                <Route path="problem" element={<GetDerivedStateFromPropsProblem value={value} />} />
                <Route path="mount" element={<ComponentDidMount />} />
                <Route path="should" element={<ShouldComponentUpdate value={value} />} />
                <Route path="snapshot" element={<GetSnapshotBeforeUpdate messages={messages} />} />
                <Route path="useeffect7" element={<UseEffectAfterRender initialValue={value} />} />
                <Route path="useeffect8" element={<UseEffectNoEffect />} />
                <Route path="useeffect9" element={<UseEffectOnDepsChange />} />
                <Route path="useeffect10" element={<UseEffectCleanup />} />
                <Route path="useeffect11" element={<UseEffectCombo />} />
                <Route path="useeffect12" element={<UseEffectMultiple />} />
                <Route path="useeffect13" element={<UseEffectDOM />} />
                <Route path="useeffect14" element={<UseEffectNested />} />
                <Route path="useeffect15" element={<UseEffectWillUnmount />} />
                <Route path="useeffect16" element={<UseEffectAsync />} />
            </Routes>
        </div>
    )
}

export default LifeCycleIndex;
