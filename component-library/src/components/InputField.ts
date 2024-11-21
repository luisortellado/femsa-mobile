type InputFieldBaseProps<T> = {
  value: T;
  onChange: (value: T) => void;
  placeholder?: string;
  readonly type: "text" | "number";
};

export class InputField<T extends string | number> {
  public props: InputFieldBaseProps<T>;

  constructor(props: InputFieldBaseProps<T>) {
    this.props = props;
  }

  // Method to handle changes in the input value
  public handleInputChange(input: string): void {
    const { type, onChange } = this.props;

    if (type === "number") {
      const parsedValue = Number(input);
      if (isNaN(parsedValue)) {
        console.error("Error: The entered value is not a valid number.");
        return;
      }
      onChange(parsedValue as T);
    } else {
      onChange(input as T);
    }
  }

  public getValueAsString(): string {
    return String(this.props.value);
  }
}

// Create a text input field
const textField = new InputField<string>({
  value: "Hello",
  onChange: (newValue) => {
    console.log("New text value:", newValue);
  },
  placeholder: "Type something...",
  type: "text",
});

// Create a numeric input field
const numberField = new InputField<number>({
  value: 42,
  onChange: (newValue) => {
    console.log("New numeric value:", newValue);
  },
  placeholder: "Type a number...",
  type: "number",
});

// Test changes in the values
textField.handleInputChange("New text");
numberField.handleInputChange("123");
numberField.handleInputChange("abc");

// Get values as strings
console.log(textField.getValueAsString());
console.log(numberField.getValueAsString());
