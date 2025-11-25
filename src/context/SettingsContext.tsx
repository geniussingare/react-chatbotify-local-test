import { useContext, createContext, Dispatch, SetStateAction, MutableRefObject } from "react";

import { Settings } from "../types/Settings";
import { DefaultSettings } from "../constants/internal/DefaultSettings";

/**
 * Creates the useSettingsContext() hook to manage settings for the chatbot.
 */
type SettingsContextType = {
	settings: Settings;
	setSyncedSettings: Dispatch<SetStateAction<Settings>>;
	syncedSettingsRef: MutableRefObject<Settings>;
	userProvidedSettingsRef: MutableRefObject<Settings>;
};
const SettingsContext = createContext<SettingsContextType>({
	settings: {},
	setSyncedSettings: () => null,
	syncedSettingsRef: {current: {}},
	userProvidedSettingsRef: {current: {}},
});
const useSettingsContext = () => useContext(SettingsContext);

/**
 * Creates provider to wrap the chatbot container.
 */
const SettingsProvider = ({
	children,
	settings = DefaultSettings,
	setSyncedSettings,
	syncedSettingsRef,
	userProvidedSettingsRef,
}: {
	children: React.ReactNode;
	settings: Settings;
	setSyncedSettings: Dispatch<SetStateAction<Settings>>;
	syncedSettingsRef: MutableRefObject<Settings>;
	userProvidedSettingsRef: MutableRefObject<Settings>;
}) => {
	return (
		<SettingsContext.Provider value={{ settings, setSyncedSettings, syncedSettingsRef, userProvidedSettingsRef }}>
			{children}
		</SettingsContext.Provider>
	);
};

export { useSettingsContext, SettingsProvider };
