"use client"
import { Toaster, toast } from 'sonner'

function ExampleComponent() {
	return (
		<div>
				<Toaster />
				<button onClick={() => toast.success('My first toast')}>
					Give me a toast
				</button>
			</div>
	);
}

export default ExampleComponent;
