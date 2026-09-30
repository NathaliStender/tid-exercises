import Parse from "parse";

const TodoList = Parse.Object.extend("TodoList");

function toPlainObject(parseObject) {
  return {
    id: parseObject.id,
    title: parseObject.get("title"),
  };
}

export async function fetchLists() {
  const query = new Parse.Query(TodoList);
  query.equalTo("owner", Parse.User.current());
  query.ascending("createdAt");
  const result = await query.find();
  return result.map(toPlainObject);
}

export async function createList(title) {
  const list = new TodoList();
  list.set("title", title);
  list.set("owner", Parse.User.current());
  return toPlainObject(await list.save());
}
