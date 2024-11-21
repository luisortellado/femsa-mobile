# femsa-mobile

# Component Library

A library of reusable and generic TypeScript components: `Button`, `InputField`, and `List`. Each component is built with flexibility, type safety, and ease of use in mind.

## Features

- **Button Component**: A generic button with flexible value types and event handling.
- **InputField Component**: A type-safe input field supporting text and numeric inputs with error handling.
- **List Component**: A flexible list component with custom rendering and filtering capabilities.

---

Components
Button
A reusable button component that supports multiple value types and custom click handlers.

## Button Component

### `src/components/Button.ts`

```typescript
type ButtonBaseProps<T> = {
  value: T; // Button value of any type
  onClick?: (value: T) => void; // Optional click event handler
  readonly disabled?: boolean; // Optional readonly disabled property
};

// Generic Button class
export class Button<T> {
  public props: ButtonBaseProps<T>;

  constructor(props: ButtonBaseProps<T>) {
    this.props = props;
  }
}
```

### Usage

```typescript
const myButton = new Button<string>({
  value: "Click Me",
  onClick: (value) => {
    console.log(`Clicked with value: ${value}`);
  },
  disabled: false,
});
```

## List Component

### `src/components/List.ts`

```typescript
// Type definition for List props
type ListBaseProps<T> = {
  items: ReadonlyArray<T>; // Readonly array of items
  renderItem: (item: T, index: number) => string; // Renders each item as a string
  filter?: (item: T) => boolean; // Optional filter function
};

// Generic List class
export class List<T> {
  public props: ListBaseProps<T>;

  constructor(props: ListBaseProps<T>) {
    this.props = props;
  }

  // Returns filtered items
  public getFilteredItems(): ReadonlyArray<T> {
    const { items, filter } = this.props;
    return filter ? items.filter(filter) : items;
  }

  // Renders all items in the list
  public render(): string {
    const { renderItem } = this.props;
    const filteredItems = this.getFilteredItems();
    return filteredItems.map(renderItem).join("\n");
  }
}
```

### Usage

```typescript
// Create a list of objects
const objectList = new List<{ id: number; name: string }>({
  items: [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" },
  ],
  renderItem: (item) => item.name,
  filter: (item) => item.id > 1,
});
```

## InputField Component

### `src/components/InputField.ts`

```typescript
// Type definition for InputField props
type InputFieldBaseProps<T> = {
  value: T; // Initial value of the input field
  onChange: (value: T) => void; // Event triggered when the value changes
  placeholder?: string; // Optional placeholder
  readonly type: "text" | "number"; // Type of input: "text" or "number"
};

// Generic InputField class
export class InputField<T extends string | number> {
  public props: InputFieldBaseProps<T>;

  constructor(props: InputFieldBaseProps<T>) {
    this.props = props;
  }

  // Handles changes in the input value
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

  // Returns the current value as a string
  public getValueAsString(): string {
    return String(this.props.value);
  }
}
```

### Usage

```typescript
// Create a numeric input field
const numberField = new InputField<number>({
  value: 42,
  onChange: (newValue) => {
    console.log("New numeric value:", newValue);
  },
  placeholder: "Type a number...",
  type: "number",
});
```
