type ButtonBaseProps<T> = {
  value: T;
  onClick?: (value: T) => void;
  readonly disabled?: boolean;
};

export class Button<T> {
  public props: ButtonBaseProps<T>;

  constructor(props: ButtonBaseProps<T>) {
    this.props = props;
  }
}

const myButton = new Button<string>({
  value: "Click Me",
  onClick: (value) => {
    console.log(`Clicked with value: ${value}`);
  },
  disabled: false,
});

const invalidButton = new Button<number>({
  value: 23,
  onClick: (value) => console.log(value),
  invalidProp: true,
});

const objectValue = new Button<object>({
  value: { key: "value" },
  onClick: (value) => console.log(value),
  disabled: true,
});

const withOutOnclick = new Button<object>({
  value: { key: "value" },
  disabled: true,
});

// Ensure type safety by restricting certain properties using utility types.
const setDisabledValue = new Button<string>({
  value: "Click Me",
  disabled: true,
});

setDisabledValue.props.disabled = true;
