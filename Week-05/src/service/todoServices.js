import Parse from "parse";

const TodoItem = Parse.Object.extend("TodoItem");
const TodoList = Parse.Object.extend("TodoList");

function toPlainObject(parseObject) {
  const owner = parseObject.get("owner");
  return {
    id: parseObject.id,
    text: parseObject.get("text"),
    done: parseObject.get("done"),
    owner: owner ? owner.id : null,
  };
}

export async function fetchTodos(listId) {
  const query = new Parse.Query(TodoItem);
  query.equalTo("owner", Parse.User.current());

  if (listId) {
    query.equalTo("list", TodoList.createWithoutData(listId));
  } else {
    query.doesNotExist("list");
  }

  query.ascending("createdAt");
  const result = await query.find();
  return result.map(toPlainObject);
}

export async function createTodo(text, listId) {
  const item = new TodoItem();
  item.set("text", text);
  item.set("done", false);
  item.set("owner", Parse.User.current());

  if (listId) {
    item.set("list", TodoList.createWithoutData(listId));
  }

  return toPlainObject(await item.save());
}

export async function setTodoDone(id, done) {
  const item = TodoItem.createWithoutData(id);
  item.set("done", done);
  return toPlainObject(await item.save());
}
export async function deleteTodo(id) {
  const item = TodoItem.createWithoutData(id);
  await item.destroy();
}
