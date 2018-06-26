import * as React from 'react';

const CuraLogo: React.StatelessComponent = (): JSX.Element => {
	return <img src={(process.env.STATIC_URL || "") + "/images/CU_Logo_RGB.svg"} alt="Cura logo" />
}

export default CuraLogo;
