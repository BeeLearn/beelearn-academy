export default function e(tagName: string, props?: Partial<Element>) {
  const element = document.createElement(tagName);
	Object.assign(element, props);

	return element;
}
