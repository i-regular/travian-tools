import React from 'react';

import { FormGroup, InputGroup } from "@blueprintjs/core";


class App extends React.PureComponent {
	render() {
		return (
			<div>
				<h1>Hello Heathens, this will be the best planning tool there is</h1>
        <FormGroup
        helperText="Helper text with details..."
        label="Label A"
        labelFor="text-input"
        labelInfo="(required)"
      >
        <InputGroup id="text-input" placeholder="Placeholder text" />
        <InputGroup id="text-input" placeholder="Placeholder text" />
        <InputGroup id="text-input" placeholder="Placeholder text" />
      </FormGroup>
			</div>
		);
	}
}

export default App;