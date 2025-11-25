import { useContext, createContext, Dispatch, SetStateAction, MutableRefObject } from "react";

import { Styles } from "../types/Styles";
import { DefaultStyles } from "../constants/internal/DefaultStyles";

/**
 * Creates the useStylesContext() hook to manage styles for the chatbot.
 */
type StylesContextType = {
	styles: Styles;
	setSyncedStyles: Dispatch<SetStateAction<Styles>>;
	syncedStylesRef: MutableRefObject<Styles>;
	userProvidedStylesRef: MutableRefObject<Styles>;
};
const StylesContext = createContext<StylesContextType>({
	styles: {},
	setSyncedStyles: () => null,
	syncedStylesRef: {current: {}},
	userProvidedStylesRef: {current: {}},
});
const useStylesContext = () => useContext(StylesContext);

/**
 * Creates provider to wrap the chatbot container.
 */
const StylesProvider = ({
	children,
	styles = DefaultStyles,
	setSyncedStyles,
	syncedStylesRef,
	userProvidedStylesRef,
}: {
	children: React.ReactNode;
	styles: Styles;
	setSyncedStyles: Dispatch<SetStateAction<Styles>>;
	syncedStylesRef: MutableRefObject<Styles>;
	userProvidedStylesRef: MutableRefObject<Styles>;
}) => {
	return (
		<StylesContext.Provider value={{ styles, setSyncedStyles, syncedStylesRef, userProvidedStylesRef }}>
			{children}
		</StylesContext.Provider>
	);
};

export { useStylesContext, StylesProvider };
