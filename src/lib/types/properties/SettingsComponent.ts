/**
 * Represents a component that can be used as an input in Pinna's settings UI.
 */
interface SettingsComponent<T> {
    /**
     * The value of this component. Generally should be bindable.
     */
    value: T;

    /**
     * Whether this component's current value has been modified from its initial state.
     */
    dirty?: boolean;

    /**
     * Whether the component's current value is valid.
     */
    valid?: boolean;
}

export type { SettingsComponent };