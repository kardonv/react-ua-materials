import React, { useState } from 'react';

function UseStateWithObject() {
  const [fullName, setFullName] = useState({ firstName: '', lastName: '' });

  return (
    <form>
      <input
        type='text'
        value={fullName.firstName}
        onChange={e => setFullName({ ...fullName, firstName: e.target.value } as any)}
      />
      <input
        type='text'
        value={fullName.lastName}
        onChange={e => setFullName({ ...fullName, lastName: e.target.value } as any)}
      />
      <h2>Your first name is - {fullName.firstName}</h2>
      <h2>Your last name is - {fullName.lastName}</h2>
    </form>
  );
}

export default UseStateWithObject;
