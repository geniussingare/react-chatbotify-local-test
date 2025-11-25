import { useEffect } from "react";

import { deepClone, getCombinedConfig } from "../../utils/configParser";
import { useSettingsInternal } from "./useSettingsInternal";
import { useStylesInternal } from "./useStylesInternal";
import { Settings } from "../../types/Settings";
import { Styles } from "../../types/Styles";
import { Plugin } from "../../types/Plugin";

/**
 * Internal custom hook to handle plugins.
 */
export const usePluginsInternal = (plugins: Array<Plugin> | undefined) => {

	const { settings, replaceSettings, userProvidedSettingsRef } = useSettingsInternal();
	const { styles, replaceStyles, userProvidedStylesRef } = useStylesInternal();

	// initializes plugins and retrieves metadata for setup
	const pluginMetaData = plugins?.map((pluginHook) => pluginHook());

	useEffect(() => {
		let pluginSettings = {};
		let pluginStyles = {};
		// applies plugin settings and styles if specified
		pluginMetaData?.forEach((pluginMetaData) => {
			if (pluginMetaData?.settings && Object.keys(pluginMetaData?.settings).length !== 0) {
				pluginSettings = getCombinedConfig(pluginMetaData.settings, pluginSettings);
			}
			if (pluginMetaData?.styles && Object.keys(pluginMetaData?.styles).length !== 0) {
				pluginStyles = getCombinedConfig(pluginMetaData.styles, pluginStyles);
			}
		});

		if (Object.keys(pluginSettings).length !== 0) {
			const combinedSettings = getCombinedConfig(pluginSettings, deepClone(settings)) as Settings;
			const finalSettings = getCombinedConfig(userProvidedSettingsRef.current, combinedSettings) as Settings;
			replaceSettings(finalSettings);
		}

		if (Object.keys(pluginStyles).length !== 0) {
			const combinedStyles = getCombinedConfig(pluginStyles, deepClone(styles)) as Styles;
			const finalStyles = getCombinedConfig(userProvidedStylesRef.current, combinedStyles) as Styles;
			replaceStyles(finalStyles);
		}
	}, [])
};
