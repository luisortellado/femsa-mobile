type ListBaseProps<T> = {
  items: ReadonlyArray<T>;
  renderItem: (item: T, index: number) => string;
  filter?: (item: T) => boolean;
};

export class List<T> {
  public props: ListBaseProps<T>;

  constructor(props: ListBaseProps<T>) {
    this.props = props;
  }

  //
  public getFilteredItems(): ReadonlyArray<T> {
    const { items, filter } = this.props;
    return filter ? items.filter(filter) : items;
  }

  // Method to get a filtered list
  public render(): string {
    const { renderItem } = this.props;
    const filteredItems = this.getFilteredItems();
    return filteredItems.map(renderItem).join("\n");
  }
}

// Create a list of strings
const stringList = new List<string>({
  items: ["apple", "banana", "cherry"],
  renderItem: (item) => item,
});

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

// Test
console.log(stringList.getFilteredItems());
console.log(objectList.getFilteredItems());
