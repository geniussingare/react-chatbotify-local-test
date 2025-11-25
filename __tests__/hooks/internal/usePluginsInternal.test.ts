import { renderHook } from "@testing-library/react";
import { usePluginsInternal } from "../../../src/hooks/internal/usePluginsInternal";
import { Settings } from "../../../src/types/Settings";
import { useSettingsInternal } from "../../../src/hooks/internal/useSettingsInternal";
import { useStylesInternal } from "../../../src/hooks/internal/useStylesInternal";

jest.mock("../../../src/hooks/internal/useSettingsInternal");
jest.mock("../../../src/hooks/internal/useStylesInternal");
jest.mock("../../../src/viteconfig", () => ({
	viteConfig: {
		DEFAULT_URL: "http://localhost:mock",
		DEFAULT_EXPIRATION: "60",
		CACHE_KEY_PREFIX: "VITE_THEME_CACHE_KEY_PREFIX",
	},
}));

describe("usePluginsInternal", () => {
	const replaceSettingsMock = jest.fn();
	const replaceStylesMock = jest.fn();
	const mockSettings: Settings = { general: { primaryColor: "red" } };
	const mockStyles = {};
	const mockPlugins = [
		() => ({
			name: "plugin1",
			settings: { general: { primaryColor: "blue" } },
			styles: { tooltipStyle: { color: "green" } },
		}),
	];

	beforeEach(() => {
		jest.clearAllMocks();
		(useSettingsInternal as jest.Mock).mockReturnValue({
			settings: mockSettings,
			replaceSettings: replaceSettingsMock,
			userProvidedSettingsRef: { current: mockSettings },
		});
		(useStylesInternal as jest.Mock).mockReturnValue({
			styles: mockStyles,
			replaceStyles: replaceStylesMock,
			userProvidedStylesRef: { current: mockStyles },
		});
	});

	it("should apply plugin overrides without replacing user provided values", () => {
		renderHook(() => usePluginsInternal(mockPlugins));

		expect(replaceSettingsMock).toHaveBeenCalledWith({
			general: { primaryColor: "red" },
		});
		expect(replaceStylesMock).toHaveBeenCalledWith({
			tooltipStyle: { color: "green" },
		});
	});

	it("should override primaryColor with plugin value when user does not provide settings", () => {
		(useSettingsInternal as jest.Mock).mockReturnValue({
			settings: {},
			replaceSettings: replaceSettingsMock,
			userProvidedSettingsRef: { current: {} },
		});

		renderHook(() => usePluginsInternal(mockPlugins));

		expect(replaceSettingsMock).toHaveBeenCalledWith({
			general: { primaryColor: "blue" },
		});
	});

	it("should skip updates when plugins are not provided", () => {
		renderHook(() => usePluginsInternal([]));

		expect(replaceSettingsMock).not.toHaveBeenCalled();
		expect(replaceStylesMock).not.toHaveBeenCalled();
	});
});
