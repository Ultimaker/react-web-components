import * as React from 'react';

const PendingIcon: React.StatelessComponent = (): JSX.Element => {
	return <div className="icon icon--pending">
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M16,29h.17A13,13,0,0,0,16,3h-.17A13,13,0,0,0,16,29Zm-.41-3.7h-.08a2,2,0,0,1,.05-4h.07a2,2,0,0,1,0,4ZM9.79,12.58a5.7,5.7,0,0,1,2.45-4.94,6.43,6.43,0,0,1,3.55-.94A7.72,7.72,0,0,1,20.37,8a4.58,4.58,0,0,1,1.85,4,4.5,4.5,0,0,1-.91,2.7,9.91,9.91,0,0,1-1.88,1.68l-.95.66a2.62,2.62,0,0,0-1,1.18,2.33,2.33,0,0,0-.14,1v.15H13.7l0-.31c0-1.27.07-2,.6-2.64a15.48,15.48,0,0,1,2.73-2.19,3.12,3.12,0,0,0,.65-.66,2.35,2.35,0,0,0,.55-1.36,2.66,2.66,0,0,0-.5-1.56,2.1,2.1,0,0,0-1.81-.68,2,2,0,0,0-1.83.84,3.41,3.41,0,0,0-.56,1.83v.16H9.78Z" fill="none"/><path d="M16,0h-.21A16,16,0,0,0,16,32h.21A16,16,0,0,0,16,0Zm.17,29H16a13,13,0,0,1-.17-26H16a13,13,0,0,1,.17,26Z"/><path d="M15.63,21.3h-.07a2,2,0,0,0-.05,4h.08a2,2,0,0,0,0-4Z"/><path d="M13.55,12.59a3.41,3.41,0,0,1,.56-1.83,2,2,0,0,1,1.83-.84,2.1,2.1,0,0,1,1.81.68,2.66,2.66,0,0,1,.5,1.56,2.35,2.35,0,0,1-.55,1.36,3.12,3.12,0,0,1-.65.66,15.48,15.48,0,0,0-2.73,2.19c-.53.62-.56,1.37-.6,2.64l0,.31h3.66v-.15a2.33,2.33,0,0,1,.14-1,2.62,2.62,0,0,1,1-1.18l.95-.66a9.91,9.91,0,0,0,1.88-1.68,4.5,4.5,0,0,0,.91-2.7,4.58,4.58,0,0,0-1.85-4A7.72,7.72,0,0,0,15.79,6.7a6.43,6.43,0,0,0-3.55.94,5.7,5.7,0,0,0-2.45,4.94v.17h3.77Zm6.62-1.32a4.5,4.5,0,0,0-.13-.5A4.5,4.5,0,0,1,20.17,11.27Z"/></svg>
	</div>
}

export default PendingIcon;
