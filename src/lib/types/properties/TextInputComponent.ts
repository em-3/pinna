import type { SettingsComponent } from "./SettingsComponent";

/**
 * Represents a component that can be used as a text input in Pinna's settings UI.
 */
interface TextInputComponent extends SettingsComponent<string> {
    /**
     * The type of input this component represents
     */
    type?: string;

    /**
     * A regular expression that will be used to validate this input
     */
    validationRegex?: RegExp;
}

export type {TextInputComponent};