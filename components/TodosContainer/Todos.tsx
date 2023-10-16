"use client";
import Todo from "./Todo";
import { Reorder, motion } from "framer-motion";
import { Todo as TodoType, User } from "@prisma/client";
import axios from "axios";
import {
  DndContext,
  KeyboardSensor,
  TouchSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis, createSnapModifier } from "@dnd-kit/modifiers";

const ListOfTodos = [
  {
    id: 1,
    task: "This is a dummy Todo",
    is_complete: false,
    user_id: "1",
    inserted_at: new Date().toString(),
    position: 1,
  },
  {
    id: 2,
    task: "This is another dummy Todo How Amazing!!",
    is_complete: false,
    user_id: "1",
    inserted_at: new Date().toString(),
    position: 0,
  },
];

interface TodoProps {
  listOfTodos: TodoType[];
  setListOfTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
}

export default function Todos({ listOfTodos, setListOfTodos }: TodoProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleReorder = async (newOrder: TodoType[]) => {
    setListOfTodos(newOrder);
    console.log(newOrder);
    for (let i = 0; i < newOrder.length; i++) {
      const todo = newOrder[i];
      console.log(todo.id);
      console.log(i);
      await axios
        .put("api/handleTodo", {
          todoId: todo.id,
          position: i + 1,
        })
        .then((res) => {
          console.log(res.data);
        });
    }
  };

  const onDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id === over.id) {
      return;
    }
    const oldIndex = listOfTodos.findIndex((todo) => todo.id === active.id);
    const newIndex = listOfTodos.findIndex((todo) => todo.id === over.id);
    const newOrder = arrayMove(listOfTodos, oldIndex, newIndex);
    setListOfTodos(newOrder);
    handleReorder(newOrder);
    console.log(event);
  };

  return (
    // <Reorder.Group
    //   as="div"
    //   axis="y"
    //   values={listOfTodos ?? []}
    //   onReorder={handleReorder}
    // >
    //   <div className="w-full rounded-md bg-mainColor max-h-[50vh] h-max min-h-full mt-10 z-10 relative overflow-y-scroll">
    //     {listOfTodos &&
    //       listOfTodos?.map((todo, index) => (
    //         <Todo key={todo.id} todo={todo} setTodos={setListOfTodos} />
    //       ))}
    //     {listOfTodos.length === 0 && (
    //       <h1 className="text-foreground text-center m-auto translate-y-1/2 text-xl">
    //         No Todos
    //       </h1>
    //     )}
    //   </div>
    // </Reorder.Group>

    <motion.div
      layout
      transition={{ duration: 0.1 }}
      className="w-full rounded-md bg-mainColor max-h-[50vh] min-h-max mt-10 z-10 relative overflow-y-scroll overflow-x-hidden"
    >
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={onDragEnd}
        sensors={sensors}
        modifiers={[restrictToVerticalAxis, createSnapModifier(0.1)]}
      >
        <SortableContext
          items={listOfTodos}
          strategy={verticalListSortingStrategy}
        >
          {listOfTodos &&
            listOfTodos?.map((todo, index) => (
              <Todo key={todo.id} todo={todo} setTodos={setListOfTodos} />
            ))}
        </SortableContext>
      </DndContext>
      {listOfTodos.length === 0 && (
        <h1 className="text-foreground text-center m-auto my-6 text-xl">
          No Todos
        </h1>
      )}
    </motion.div>
  );
}
